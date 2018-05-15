import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  } from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public isSearchBarOpened = false;


  constructor(public navCtrl: NavController) {

  }

}
