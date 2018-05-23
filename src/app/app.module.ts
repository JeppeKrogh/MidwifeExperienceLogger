import { HttpClientModule } from '@angular/common/http'; 
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProfilePage } from "../pages/profile/profile";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ErfaringPage } from '../pages/erfaring/erfaring';
import { LoginPage } from '../pages/login/login';
import { GoogleLoginComponent } from "../components/google-login/google-login";
import { PopoversComponent } from "../components/popovers/popovers";
import { IntroslidesPage } from "../pages/introslides/introslides";
import { ErfaringsKategorierComponent } from "../components/erfarings-kategorier/erfarings-kategorier";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePickerModule } from 'ion-datepicker';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SwingModule } from 'angular2-swing';
import { GooglePlus } from '@ionic-native/google-plus'; 
import { RegisterPageModule } from '../pages/register/register.module';
import { TinderSwiperComponent } from '../components/tinder-swiper/tinder-swiper';
import { TinderRequirementsProvider } from '../providers/tinder-requirements/tinder-requirements';

import {HttpModule} from '@angular/http';
import { ErfaringsListeComponent } from '../components/erfarings-liste/erfarings-liste';

const firebaseConfig = {
    apiKey: "AIzaSyA6wpZg5s78EF76yDT4k5-FUBFcBdSYx1M",
    authDomain: "midwifeexperiencelogger.firebaseapp.com",
    databaseURL: "https://midwifeexperiencelogger.firebaseio.com",
    projectId: "midwifeexperiencelogger",
    storageBucket: "midwifeexperiencelogger.appspot.com",
    messagingSenderId: "637567833913"
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    GoogleLoginComponent,
    PopoversComponent,
    ErfaringsKategorierComponent,
    TinderSwiperComponent,
    HomePage,
    LoginPage,
    TabsPage,
    ErfaringPage,
    IntroslidesPage,
    ErfaringsListeComponent,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RegisterPageModule,
    SwingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    GoogleLoginComponent,
    PopoversComponent,
    ErfaringsKategorierComponent,
    TinderSwiperComponent,
    TabsPage,
    ErfaringPage,
    IntroslidesPage,
    ErfaringsListeComponent,
    ProfilePage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    TinderRequirementsProvider,
    ErfaringsKategorierComponent
  ]
})
export class AppModule {

  
}
