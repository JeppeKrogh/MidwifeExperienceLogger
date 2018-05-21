import { Component, ViewChild } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { ErfaringPage } from "../../pages/erfaring/erfaring";
import { TinderRequirementsProvider } from "../../providers/tinder-requirements/tinder-requirements";
import { DatePickerDirective } from 'ion-datepicker';

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
  categories = [];
  category = [];
  date: any;
  requirementsarray = [];
  kategorier = [];


  constructor(private _DB: DatabaseProvider, private requirementsService: TinderRequirementsProvider) {


    this.kategorier = [{
      value: "Kategori 1",
      data: "1"
    },
    {
      value: "Kategori 2",
      data: "2"
    },
    {
      value: "Kategori 3",
      data: "3"
    },
    {
      value: "Kategori 4",
      data: "4"
        }
    ]
    this.categories = this.kategorier;

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

  options() {
    this.date = this.initDate;
    
    this.category = this.category;
    this.requirementsarray.push(this.category, this.date);
    console.log(this.requirementsarray);
    this.requirementsService.announceRequirements(this.requirementsarray);


  }
}
