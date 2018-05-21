import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErfaringsKategorierComponent } from "../../components/erfarings-kategorier/erfarings-kategorier";
import { TinderSwiperComponent } from "../../components/tinder-swiper/tinder-swiper";
/**
 * Generated class for the ErfaringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-erfaring',
  templateUrl: 'erfaring.html'
})
export class ErfaringPage {

  kategoriv1:string;
  kategoriv2:string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }



  

      
  ionViewDidLoad() {
    console.log('ionViewDidLoad ErfaringPage');
  }

  

}


 