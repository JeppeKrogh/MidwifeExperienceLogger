import { Component } from '@angular/core';
import { TabsPage } from '../../pages/tabs/tabs';
import { RegisterPage } from '../../pages/register/register';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GoogleLoginComponent } from "../../components/google-login/google-login";
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth 
  ) {
    
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.navCtrl.setRoot(TabsPage); 
      } else {
        console.log('user not logged in');
      }
    });
    
  }
  async login(user: User) {
    console.log("logging in");
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      if (result) {
        console.log("result is:" + result);
        this.navCtrl.setRoot(TabsPage); 
        console.log("result is here");
      } 
      console.log("logged in successfully"); 
    } catch(err) {
      console.log(err);
    }  
  } 
  register() { 
    this.navCtrl.push(RegisterPage); 
  }

}
