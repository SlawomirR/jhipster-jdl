import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterJdlSharedModule } from 'app/shared';
import {
    EmployeeComponent,
    EmployeeDeleteDialogComponent,
    EmployeeDeletePopupComponent,
    EmployeeDetailComponent,
    employeePopupRoute,
    employeeRoute,
    EmployeeUpdateComponent
} from './';

const ENTITY_STATES = [...employeeRoute, ...employeePopupRoute];

@NgModule({
    imports: [JhipsterJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeeComponent,
        EmployeeDetailComponent,
        EmployeeUpdateComponent,
        EmployeeDeleteDialogComponent,
        EmployeeDeletePopupComponent
    ],
    entryComponents: [EmployeeComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent, EmployeeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJdlEmployeeModule {}
