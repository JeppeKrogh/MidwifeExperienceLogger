import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { PopoversComponent } from './popovers/popovers';
import { ErfaringsKategorierComponent } from './erfarings-kategorier/erfarings-kategorier';
import { TinderSwiperComponent } from './tinder-swiper/tinder-swiper';
import { ErfaringsListeComponent } from './erfarings-liste/erfarings-liste';


@NgModule({
    declarations: [
        GoogleLoginComponent,
        PopoversComponent,
        ErfaringsKategorierComponent,
    TinderSwiperComponent,
    ErfaringsListeComponent
    ],
    imports: [

    ],
    exports: [
        GoogleLoginComponent,
        PopoversComponent,
        ErfaringsKategorierComponent,
    TinderSwiperComponent,
    ErfaringsListeComponent,

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
