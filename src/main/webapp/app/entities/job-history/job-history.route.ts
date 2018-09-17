import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJobHistory, JobHistory } from 'app/shared/model/job-history.model';
import { JobHistoryService } from './job-history.service';
import { JobHistoryComponent } from './job-history.component';
import { JobHistoryDetailComponent } from './job-history-detail.component';
import { JobHistoryUpdateComponent } from './job-history-update.component';
import { JobHistoryDeletePopupComponent } from './job-history-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class JobHistoryResolve implements Resolve<IJobHistory> {
    constructor(private service: JobHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((jobHistory: HttpResponse<JobHistory>) => jobHistory.body));
        }
        return of(new JobHistory());
    }
}

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history',
        component: JobHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history/:id/view',
        component: JobHistoryDetailComponent,
        resolve: {
            jobHistory: JobHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history/new',
        component: JobHistoryUpdateComponent,
        resolve: {
            jobHistory: JobHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history/:id/edit',
        component: JobHistoryUpdateComponent,
        resolve: {
            jobHistory: JobHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history/:id/delete',
        component: JobHistoryDeletePopupComponent,
        resolve: {
            jobHistory: JobHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
