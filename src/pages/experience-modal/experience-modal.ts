import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from "../../providers/database/database";
import * as firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the ExperienceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experience-modal',
  templateUrl: 'experience-modal.html',
})
export class ExperienceModalPage {

experienceNotes = [];
experienceHeader: string;
contentLoaded = false;
emptyData: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private afAuth: AngularFireAuth, private _DB: DatabaseProvider) {
    console.log(navParams.get('experienceId'));
    console.log(navParams.get('experienceName'));
    this.experienceHeader = navParams.get('experienceName');

    this.afAuth.authState.subscribe(res => {
      let db = firebase.firestore()
      let path = "users/" + res.uid + "/erfaringer/"
      
      db.collection(path).where("id", "==", navParams.get('experienceId')).where("note", ">", "")
        .get()
        .then(querySnapshot => {
          if (!querySnapshot) {
            console.log("sorry, no data");
          } else {
            querySnapshot.docs.forEach(docSnap => {
              console.log("docsnap data");
              console.log(docSnap.data());

                this.experienceNotes.push(docSnap.data());
              
            })
            if (this.experienceNotes.length == 0) {
              this.emptyData = "Intet at se her 🕵️‍🤷‍"
            }
            this.contentLoaded = true;
          }

          })
        })
  }

  ionViewDidLoad() {
        console.log('ionViewDidLoad ExperienceModalPage');
      }

  closeModal() {
        this.view.dismiss();
      }

}
