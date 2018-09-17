import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department, IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';
import { DepartmentComponent } from './department.component';
import { DepartmentDetailComponent } from './department-detail.component';
import { DepartmentUpdateComponent } from './department-update.component';
import { DepartmentDeletePopupComponent } from './department-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class DepartmentResolve implements Resolve<IDepartment> {
    constructor(private service: DepartmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((department: HttpResponse<Department>) => department.body));
        }
        return of(new Department());
    }
}

export const departmentRoute: Routes = [
    {
        path: 'department',
        component: DepartmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department/:id/view',
        component: DepartmentDetailComponent,
        resolve: {
            department: DepartmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department/new',
        component: DepartmentUpdateComponent,
        resolve: {
            department: DepartmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department/:id/edit',
        component: DepartmentUpdateComponent,
        resolve: {
            department: DepartmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentPopupRoute: Routes = [
    {
        path: 'department/:id/delete',
        component: DepartmentDeletePopupComponent,
        resolve: {
            department: DepartmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
