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
  categoryLength: number = 0;


  constructor(private _DB: DatabaseProvider, private requirementsService: TinderRequirementsProvider) {
        let db = firebase.firestore();
    this._DB.getDocuments("erf")
      .then((data) => {
        if (data.length === 0) {
          console.log("nope");
        }
        else {
          var kategorier = new Array();
          for (var key in data) {
            kategorier.push(data[key])
          }
          this.categories = kategorier;
          


        }
      })
      .catch();
    this.requirementsarray = [];
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
    this.requirementsarray = [];
    if (this.category.length > 0) {
      this.categoryLength = this.category.length;
      this.requirementsarray.push(this.category, this.date);
      this.requirementsService.announceRequirements(this.requirementsarray);
      
    }  
    this.category = [];
  }

 
  
}

