import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { PopoversComponent } from './popovers/popovers';
import { ErfaringsKategorierComponent } from './erfarings-kategorier/erfarings-kategorier';


@NgModule({
	declarations: [GoogleLoginComponent,
    PopoversComponent,
    ErfaringsKategorierComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    PopoversComponent,
    ErfaringsKategorierComponent]
})
export class ComponentsModule {}
