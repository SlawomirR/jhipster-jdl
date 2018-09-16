import { NgModule } from '@angular/core';

import { JhiAlertComponent, JhiAlertErrorComponent, JhipsterJdlSharedLibsModule } from './';

@NgModule({
    imports: [JhipsterJdlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterJdlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterJdlSharedCommonModule {}
