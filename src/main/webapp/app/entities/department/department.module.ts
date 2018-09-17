import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterJdlSharedModule } from 'app/shared';
import {
    DepartmentComponent,
    DepartmentDeleteDialogComponent,
    DepartmentDeletePopupComponent,
    DepartmentDetailComponent,
    departmentPopupRoute,
    departmentRoute,
    DepartmentUpdateComponent
} from './';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
    imports: [JhipsterJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartmentComponent,
        DepartmentDetailComponent,
        DepartmentUpdateComponent,
        DepartmentDeleteDialogComponent,
        DepartmentDeletePopupComponent
    ],
    entryComponents: [DepartmentComponent, DepartmentUpdateComponent, DepartmentDeleteDialogComponent, DepartmentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJdlDepartmentModule {}
