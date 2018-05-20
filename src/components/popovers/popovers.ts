import { Component } from '@angular/core';
import { ViewController, PopoverController, Platform, NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { GooglePlus } from "@ionic-native/google-plus";
import { LoginPage } from "../../pages/login/login";
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the PopoversComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popovers',
  templateUrl: 'popovers.html'
})
export class PopoversComponent {

  text: string;

  constructor(public viewCtrl: ViewController,
              public navCtrl  : NavController, 
              public popoverCtrl: PopoverController, 
              private afAuth  : AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform) {
  }
  
  close() {
    this.viewCtrl.dismiss();
  }

  signOut() {
    this.afAuth.auth.signOut();
    
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
    window.location.reload();
  }
}
