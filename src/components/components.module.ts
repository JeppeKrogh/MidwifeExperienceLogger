import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { PopoversComponent } from './popovers/popovers';
import { ErfaringsKategorierComponent } from './erfarings-kategorier/erfarings-kategorier';
import { TinderSwiperComponent } from './tinder-swiper/tinder-swiper';


@NgModule({
    declarations: [
        GoogleLoginComponent,
        PopoversComponent,
        ErfaringsKategorierComponent,
    TinderSwiperComponent
    ],
    imports: [

    ],
    exports: [
        GoogleLoginComponent,
        PopoversComponent,
        ErfaringsKategorierComponent,
    TinderSwiperComponent,

    ]
  })


// @NgModule({
// 	declarations: [GoogleLoginComponent,
//         PopoversComponent],
//         imports: [],
//         exports: [GoogleLoginComponent,
//         PopoversComponent]
//     })

//     PopoversComponent,
//     ErfaringsKategorierComponent,
// 	imports: [],
// 	exports: [GoogleLoginComponent,
//     PopoversComponent,
//     ErfaringsKategorierComponent]
// })

export class ComponentsModule {}
