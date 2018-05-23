import { Component } from '@angular/core';
import { ModalController, AlertController, Alert, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DatabaseProvider } from "../../providers/database/database";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the ErfaringsListeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erfarings-liste',
  templateUrl: 'erfarings-liste.html'
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
  testarray = [];

  constructor(private http: Http, private model: ModalController, private _DB: DatabaseProvider, private alertCtrl: AlertController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {

    this.note = "";
    //dummy json data. her skal man connect med rigtig database til den endelige version
    // let localDate = this.http.get('assets/information.json').map(res => res.json().items);
    // localDate.subscribe(data => {
    //   this.information = data;
    // });


    let db = firebase.firestore();
    this._DB.getDocuments("erf")
      .then((data) => {
        if (data.length === 0) {
          console.log("no data");
        }
        else {
          // this.information = data;

          this.categories = data;
          // this.categ = data;
          var newi = 1;
          for (var key in data) {
          
            let path = "erf/kat" + newi + "/kat" + newi; 
              this._DB.getDocuments(path)
                .then((data2) => {
                  if (data2.length === 0) {
                    this.subCategories = [];   
                  }
                  else {
                    this.testarray.push(data2)      
                  }
                })
                .catch();
                newi++;
              }
        }
      })
      .catch();

  }

  openModel() {

  }

  toggleSection(i) {

    var newi = i+1;
    

    let db = firebase.firestore();
    let path = "erf/kat" + newi + "/kat" + newi; 

          this._DB.getDocuments(path)
            .then((data) => {
              if (data.length === 0) {
                this.subCategories = [];   
              }
              else {
                this.subCategories = data;    
                this.categories[i].open = !this.categories[i].open;        
              }
            })
            .catch();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Tilknyt Note',
      inputs: [
        {
          name: 'note',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Slet note',
          role: 'cancel',
          handler: data => {
            this.note = "";
          }
        },
        {
          text: 'Tilføj Note',
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
  addItem($event) {
    this.afAuth.authState.subscribe(res => {
      let db = firebase.firestore();
      let path = "users/" + res.uid + "/erfaringer";
      db.collection(path).doc().set({
        note: this.note,
        id: $event
      })
      this.note = "";
    });

    let toast = this.toastCtrl.create({
      message: 'Erfaring Tilføjet 🤩',
      duration: 1000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }
  toggleItem(i, j) {
    // this.information[i].children[j].open = !this.information[i].children[j].open;


  }
  //search bar
  onInput(event) {
    let toast = this.toastCtrl.create({
      message: 'Søgefunktionen er endnu ikke implementeret',
      duration: 1000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
    // let serVal = event.target.value;
    // if (serVal && serVal.trim() != "") {
    //   this.categories
    // }
  }
  onSearch(event) {
   

  }

}
