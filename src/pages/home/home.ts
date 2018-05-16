
import { Component } from '@angular/core';
import { Slides, NavController, AlertController, IonicPage, NavParams, ToastController, PopoverController  } from 'ionic-angular';
import { PopoversComponent } from '../../components/popovers/popovers';
import { DatabaseProvider } from '../../providers/database/database';
=======
import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  IonicPage,
  NavParams,
  ToastController,
  PopoverController
} from "ionic-angular";
import { PopoversComponent } from "../../components/popovers/popovers";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import "firebase/firestore";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})


  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public popoverCtrl: PopoverController


export class HomePage {
  
  


  ) {


  }

  ionViewWillLoad() {
    let db = firebase.firestore();

    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        var docRef = db.collection("users").doc(data.uid);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
            } else if (data.displayName) {
              db.collection('users').doc(data.uid).set({
                user_email: data.email,
                user_name: data.displayName
              })
            } else if (data.email) {
            } else {
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }

//   private _COLL: string = "vest";
//   private _DOC: string = "test";
//   private _CONTENT: string = "test";

//   saveDocument(val : any) : void
//   {
//   this._DB.addDocument(this._COLL,
//   {
//     city: "test",
//     population: "hest",
//     established: "vest"
//   })
//   .then((data) => {
//     console.log('Record added' + this._COLL + 'The document  was successfully added');
//   })
//   .catch((error) => {
//     console.log('Adding document failed', error.message);
//   });
// }

  }
