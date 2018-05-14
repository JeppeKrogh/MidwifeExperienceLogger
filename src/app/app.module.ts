import { HttpClientModule } from '@angular/common/http'; 
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ErfaringPage } from '../pages/erfaring/erfaring';
import { LoginPage } from '../pages/login/login';
import { GoogleLoginComponent } from "../components/google-login/google-login";
import { PopoversComponent } from "../components/popovers/popovers";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePickerModule } from 'ion-datepicker';
import { DatabaseProvider } from '../providers/database/database';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus'; 
import { RegisterPageModule } from '../pages/register/register.module';


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
    HomePage,
    LoginPage,
    TabsPage,
    ErfaringPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RegisterPageModule
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
    TabsPage,
    ErfaringPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {

  
}
