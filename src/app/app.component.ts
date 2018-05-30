import { Component } from '@angular/core';
import { Platform, PopoverController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoversComponent } from '../components/popovers/popovers';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import {IntroslidesPage} from "../pages/introslides/introslides";
import { environment } from '../environments/environment';
import { GoogleLoginComponent } from "../components/google-login/google-login";
import firebase from 'firebase';
import { GoogleAdditionalInformationPage } from '../pages/google-additional-information/google-additional-information';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = GoogleAdditionalInformationPage; 
  //rootPage:any = LoginPage; 


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public popoverCtrl: PopoverController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoversComponent);
    popover.present({
      ev: myEvent
    });
  }
}
