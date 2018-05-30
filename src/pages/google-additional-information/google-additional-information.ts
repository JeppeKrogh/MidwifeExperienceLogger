import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the GoogleAdditionalInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-additional-information',
  templateUrl: 'google-additional-information.html',
})
export class GoogleAdditionalInformationPage {

  user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleAdditionalInformationPage');
  }
  async register(user: User) {

      try {
        // this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        var date = new Date();
        var studentDate = user.student_date;
        var studentStartNew = new Date(Date.parse(studentDate.replace(/-/g, " ")))
        var diff = Math.abs(date.getTime() - studentStartNew.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        var currentSemester = Math.floor(diffDays / 182.5);
        this.afAuth.authState.subscribe(res => {
          if (res && res.uid) {
            let db = firebase.firestore();

            db.collection('users').doc(res.uid).set({
              user_email: res.email,
              user_name: res.displayName,
              student_id: user.student_id,
              student_semester: currentSemester
            })
            console.log(res);
          }
        })
        this.navCtrl.setRoot(TabsPage);
      } catch (err) {
        console.log(err);
      }
    }
}
