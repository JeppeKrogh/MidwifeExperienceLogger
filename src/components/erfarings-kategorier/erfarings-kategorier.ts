import { Component, ViewChild } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { ErfaringPage } from "../../pages/erfaring/erfaring";
import { TinderRequirementsProvider } from "../../providers/tinder-requirements/tinder-requirements";
import { DatePickerDirective } from 'ion-datepicker';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the ErfaringsKategorierComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erfarings-kategorier',
  templateUrl: 'erfarings-kategorier.html',
  providers: [DatePickerDirective],
})
export class ErfaringsKategorierComponent {


  text: string;
  categories: any[];
  category: any[];
  date: any;
  requirementsarray = [];


  constructor(private _DB: DatabaseProvider, private requirementsService: TinderRequirementsProvider) {
    
    console.log(this.category);


    let db = firebase.firestore();
    this._DB.getDocuments("erf")
      .then((data) => {
        if (data.length === 0) {
          console.log("nope");
        }
        else {
          // this.information = data;
          var kategorier = new Array();
          for (var key in data) {
            kategorier.push(data[key])
          }
          console.log(data);
          console.log(kategorier);
          // console.log("kategorier" + kategorier[0]);
          this.categories = kategorier;
          


        }
      })
      .catch();
    this.requirementsarray = [];



    // var _COLL = "erfaringer";
    // this._DB.getDocuments(_COLL)
    //   .then((data) => {
    //     // IF we don't have any documents then the collection doesn't exist
    //     // so we create it!
    //     if (data.length === 0) {
    //       console.log("nope");
    //     }
    //     // Otherwise the collection does exist and we assign the returned
    //     // documents to the public property of locations so this can be
    //     // iterated through in the component template
    //     else {
    //       console.log(data);
    //       var kategorier = new Array();
    //       for (var key in data) {
    //         kategorier.push(data[key].kategorier)
    //       }
    //       this.categories = kategorier;
    //     }
    //   })
    //   .catch();
  }

  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate: Date = new Date();

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date: Date) {
    this.initDate = date;
  }
 
  public options() {
    this.date = this.initDate;
    console.log(this.category);
    this.requirementsarray = [];
    this.category = this.category;
    this.requirementsarray.push(this.category, this.date);
    console.log("erfaringsarrayet: " + this.requirementsarray);
    this.requirementsService.announceRequirements(this.requirementsarray);
  }
  
}

