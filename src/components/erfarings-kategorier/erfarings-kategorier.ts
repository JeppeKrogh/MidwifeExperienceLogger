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

  constructor(private _DB: DatabaseProvider) {
    console.log('Hello ErfaringsKategorierComponent Component');

    var _COLL = "erfaringer";

    this._DB.getDocuments(_COLL)
      .then((data) =>
      {

         if(data.length === 0)
         {
            console.log("no such collection");
         }

         else
         {
          // export const HEROES: Hero[] = 
            console.log(data);
         }
      })
      .catch();
  }

 


}
