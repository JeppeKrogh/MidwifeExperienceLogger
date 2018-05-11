import { Component } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";
/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  text: string;
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform) {
    this.user = this.afAuth.authState;
  }


  googleLogin() {
    if (this.platform.is('cordova')) {
      console.log("is native");
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'WebClientId': '408254753163-ue5hc18hulu5dogthejl4d82271416ks.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )


    } catch(err) {
      console.log(err);
    }
  }

async webGoogleLogin(): Promise<void> {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
  } catch(err) {
    console.log(err);
  }
}

signOut() {
  this.afAuth.auth.signOut();
  if (this.platform.is('cordova')) {
    this.gplus.logout();
  }
}


}
