import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { PopoversComponent } from './popovers/popovers';
import { IntroSkipSlidesComponent } from './intro-skip-slides/intro-skip-slides';


@NgModule({
	declarations: [GoogleLoginComponent,
    PopoversComponent,
    IntroSkipSlidesComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    PopoversComponent,
    IntroSkipSlidesComponent]
})
export class ComponentsModule {}
