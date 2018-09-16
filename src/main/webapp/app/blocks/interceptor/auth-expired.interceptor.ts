import { Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthServerProvider } from 'app/core/auth/auth-session.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(private stateStorageService: StateStorageService, private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401 && err.url && !err.url.includes('/api/account')) {
                            const destination = this.stateStorageService.getDestinationState();
                            if (destination !== null) {
                                const to = destination.destination;
                                const toParams = destination.params;
                                if (to.name === 'accessdenied') {
                                    this.stateStorageService.storePreviousState(to.name, toParams);
                                }
                            } else {
                                this.stateStorageService.storeUrl('/');
                            }

                            const authServer: AuthServerProvider = this.injector.get(AuthServerProvider);
                            authServer.logout();
                            const loginModalService: LoginModalService = this.injector.get(LoginModalService);
                            loginModalService.open();
                        }
                    }
                }
            )
        );
    }
}
