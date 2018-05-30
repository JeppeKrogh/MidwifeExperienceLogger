import { Component } from "@angular/core";
import {
  AlertController,
  ToastController
} from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import "firebase/firestore";

/**
 * Generated class for the ErfaringsListeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "erfarings-liste",
  templateUrl: "erfarings-liste.html"
})
export class ErfaringsListeComponent {
  public isSearchBarOpened = false;

  information: any[];
  listData: any[];
  category: any;
  categories: any[];
  subCategory: any;
  subCategories: any[];
  note: string;
  nyErfaringsArray = [];
  newKey: number = 0;
  test: any;

  constructor(
    private _DB: DatabaseProvider,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
    this.note = "";

    this.afAuth.authState.subscribe(res => {
      this._DB.getDocuments("erf").then(data => {
        if (data.length === 0) {
          console.log("nope");
        } else {
          // this.information = data;
          var kategorier = new Array();

          var i = 0;
          for (var key in data) {
            i++;

            let db = firebase.firestore();
            let path = "erf/kat" + i + "/kat" + i;
            db
              .collection(path)
              .get()
              .then(querySnapshot => {
                if (!querySnapshot) {
                  console.log("sorry, no data");
                } else {
                  this.nyErfaringsArray = [];
                  querySnapshot.docs.forEach(docSnap => {
                    this.nyErfaringsArray.push({
                      navn: docSnap.data().navn,
                      id: docSnap.id
                    });
                  });
                }
                kategorier.push({
                  parent: {
                    name : data[this.newKey].navn,
                    number: this.newKey+1,
                  },
                  child: this.nyErfaringsArray
                });
                this.newKey++;
              });
          }
          this.categories = kategorier;
        }
      });
    });
  }


  openModel() {}

  toggleSection(i) {
    this.categories[i].open = !this.categories[i].open;
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: "Tilknyt Note",
      inputs: [
        {
          name: "note",
          placeholder: ""
        }
      ],
      buttons: [
        {
          text: "Slet note",
          role: "cancel",
          handler: data => {
            this.note = "";
          }
        },
        {
          text: "Tilføj Note",
          handler: data => {
            if (data > "") {
              this.note = data.note;
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  addItem(experienceId, experienceName, parentNumber) {
    console.log(experienceId);
    console.log(experienceName);
    var date = new Date();
    this.afAuth.authState.subscribe(res => {
      this._DB
        .getDocument("users", res.uid)
        .then(data => {
          if (data.length === 0) {
            console.log("no data");
          } else {
            for (var key in data) {
              console.log(data[key].student_semester);
            }
            if (data[key].student_semester <= 3) {
              this.test = 1;
            } else if (
              data[key].student_semester > 3 &&
              data[key].student_semester <= 5
            ) {
              this.test = 2;
            } else if (
              data[key].student_semester > 5 &&
              data[key].student_semester <= 7
            ) {
              this.test = 3;
            }

            let db = firebase.firestore();
            let path = "users/" + res.uid + "/erfaringer";
            db
              .collection(path)
              .doc()
              .set({
                navn: experienceName,
                note: this.note,
                id: experienceId,
                time: date,
                internship: this.test,
                parent: +parentNumber,
              });
          }
        })
        .catch();


      
    });
    let toast = this.toastCtrl.create({
      message: 'Erfaring Tilføjet',
      duration: 1000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      this.note = "";
      // this.addedNote = false;
    });
    toast.present();
  }
  //search bar
  onInput(event) {
    let toast = this.toastCtrl.create({
      message: "Søgefunktionen er endnu ikke implementeret",
      duration: 1000,
      position: "top"
    });
    toast.onDidDismiss(() => {});
    toast.present();
    // let serVal = event.target.value;
    // if (serVal && serVal.trim() != "") {
    //   this.categories
    // }
  }
  onSearch(event) {}
}
