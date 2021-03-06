import { Component } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth
  ) {
    

    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  async register(user: User) {
    try {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      var date = new Date();
      var studentDate = user.student_date;
      var studentStartNew = new Date(Date.parse(studentDate.replace(/-/g, " ")))
      var diff = Math.abs(date.getTime() - studentStartNew.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 

      var currentSemester = Math.floor(diffDays/182.5);
      this.afAuth.authState.subscribe(res => {
       if (res && res.uid) {
          let db = firebase.firestore();
          

        db.collection('users').doc(res.uid).set({
          user_email: res.email,
          user_name: user.user_name,
          student_id: user.student_id,
          student_semester: currentSemester
        })
         console.log(res);
       } 
      })
      this.navCtrl.push(LoginPage);
    } catch(err) {
      console.log(err);
    }
  }


}
