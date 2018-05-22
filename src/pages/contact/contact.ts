import { Component } from '@angular/core';
import { NavController, ItemSliding , ModalController } from 'ionic-angular';
import {  } from "../login/login";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public isSearchBarOpened = false;

  information: any[];
  constructor(public navCtrl: NavController, private http:Http, private modal:ModalController) {


    //dummy json data. her skal man connect med rigtig database til den endelige version
   //   let localDate = this.http.get('assets/information.json').map(res => res.json().items);
   //   localDate.subscribe(data => {
   //     this.information = data;
   //   });
  }

  

  openModal() {
    let myModal = this.modal.create('ModalContentPage');
    myModal.present();

  }

  
  //toggleSection(i) {
//    this.information[i].open = !this.information[i].open;

//  }

//  toggleItem(i, j) {
//      this.information[i].children[j].open = !this.information[i].children[j].open;


 //   }
  //search bar
 // onSearch(event){
 //   console.log(event.target.value);
 // }

}
