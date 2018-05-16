import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { PopoversComponent } from './popovers/popovers';


@NgModule({
	declarations: [GoogleLoginComponent,
    PopoversComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    PopoversComponent]
})
export class ComponentsModule {}
