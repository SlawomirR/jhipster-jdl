import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterJdlSharedModule } from 'app/shared';
import {
    JobHistoryComponent,
    JobHistoryDeleteDialogComponent,
    JobHistoryDeletePopupComponent,
    JobHistoryDetailComponent,
    jobHistoryPopupRoute,
    jobHistoryRoute,
    JobHistoryUpdateComponent
} from './';

const ENTITY_STATES = [...jobHistoryRoute, ...jobHistoryPopupRoute];

@NgModule({
    imports: [JhipsterJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobHistoryComponent,
        JobHistoryDetailComponent,
        JobHistoryUpdateComponent,
        JobHistoryDeleteDialogComponent,
        JobHistoryDeletePopupComponent
    ],
    entryComponents: [JobHistoryComponent, JobHistoryUpdateComponent, JobHistoryDeleteDialogComponent, JobHistoryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJdlJobHistoryModule {}
