
import { Component } from '@angular/core';
import { ItemSliding, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { DatabaseProvider } from '../../providers/database/database';
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
import { GoogleAdditionalInformationPage } from "../google-additional-information/google-additional-information";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})





export class HomePage {

  todaysDate: any;
  
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public popoverCtrl: PopoverController,
    private datePipe: DatePipe,
    private modalCtrl: ModalController

  ) {
    this.todaysDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy'); //whatever format you need. 
    console.log(this.todaysDate);

  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  ionViewWillLoad() {
    let db = firebase.firestore();

    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        var docRef = db.collection("users").doc(data.uid);
        docRef
          .get()
          .then((doc) =>{
            if (doc.exists) {
            } else if (data.displayName) {
              console.log("google?");
              this.navCtrl.setRoot(GoogleAdditionalInformationPage);
              // db.collection('users').doc(data.uid).set({
              //   user_email: data.email,
              //   user_name: data.displayName
              // })
              
            } else if (data.email) {
            } else {
              console.log("??");
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
showModal(value) {
  console.log(value);
  const modal = this.modalCtrl.create('ModalContentPage', { value: value });
  // let modal = this.modalCtrl.create('ModalContentPage');
  modal.present();

}
  }
