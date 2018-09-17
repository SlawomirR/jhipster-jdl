import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { CountryComponent } from './country.component';
import { CountryDetailComponent } from './country-detail.component';
import { CountryUpdateComponent } from './country-update.component';
import { CountryDeletePopupComponent } from './country-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CountryResolve implements Resolve<ICountry> {
    constructor(private service: CountryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((country: HttpResponse<Country>) => country.body));
        }
        return of(new Country());
    }
}

export const countryRoute: Routes = [
    {
        path: 'country',
        component: CountryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country/:id/view',
        component: CountryDetailComponent,
        resolve: {
            country: CountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country/new',
        component: CountryUpdateComponent,
        resolve: {
            country: CountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country/:id/edit',
        component: CountryUpdateComponent,
        resolve: {
            country: CountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country/:id/delete',
        component: CountryDeletePopupComponent,
        resolve: {
            country: CountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
