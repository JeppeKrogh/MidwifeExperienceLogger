import { Component } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { ErfaringPage } from "../../pages/erfaring/erfaring";

/**
 * Generated class for the ErfaringsKategorierComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erfarings-kategorier',
  templateUrl: 'erfarings-kategorier.html'
})
export class ErfaringsKategorierComponent {


  
  text: string;
  heroes = [];
  
  // myHero = this.heroes[0];

  constructor(private _DB: DatabaseProvider) {
    console.log('Hello ErfaringsKategorierComponent Component');

    var _COLL = "erfaringer";

    this._DB.getDocuments(_COLL)
      .then((data) =>
      {

         // IF we don't have any documents then the collection doesn't exist
         // so we create it!
         if(data.length === 0)
         {
            console.log("nope");
         }

         // Otherwise the collection does exist and we assign the returned
         // documents to the public property of locations so this can be
         // iterated through in the component template
         else
         {
           console.log(data);
          var kategorier = new Array(); 
          for (var key in data) {
            kategorier.push(data[key].kategorier)
          }
          this.heroes = kategorier;

         }
      })
      .catch();
         }
  }

 



