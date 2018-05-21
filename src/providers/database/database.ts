import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  /**
   * @name _DB
   * @type {object}
   * @private
   * @description     Defines an object for handling interfacing with the
              Cloud Firestore database service
   */
  private _DB: any;

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');

    // Initialise access to the firestore service
    this._DB = firebase.firestore();
  }


  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj)
        .get()
        .then((querySnapshot) => {

          // Declare an array which we'll use to store retrieved documents
          let obj: any = [];
         

          // Iterate through each document, retrieve the values for each field
          // and then assign these to a key in an object that is pushed into the
          // obj array
          querySnapshot
            .forEach((doc: any) => {
              obj.push({
                kategorier : doc.id,
                navn       : doc.data().navn 
              });
            });


          // Resolve the completed array that contains all of the formatted data
          // from the retrieved documents
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getDocument(collectionObj: string, documentObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj)
        .doc(documentObj)
        .get()
        .then(function(doc) {
          let obj: any = [];

          if (doc.exists) {
              obj.push(doc.data());
          } else {
              console.log("No such document!");
          }
          resolve(obj);
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    });
  }

}

