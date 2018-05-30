import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ErfaringsKategorierComponent } from "../../components/erfarings-kategorier/erfarings-kategorier";
import { TinderSwiperComponent } from "../../components/tinder-swiper/tinder-swiper";
import {Http} from '@angular/http';
/**
 * Generated class for the ErfaringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  providers: [ErfaringsKategorierComponent],
  selector: 'page-erfaring',
  templateUrl: 'erfaring.html'
})
export class ErfaringPage {

  kategoriv1:string;
  kategoriv2:string;
  erfaringsVisning: any;
  public isSearchBarOpened = false;
  segmentShown: boolean = false;

  information: any[];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private http:Http, 
              private model:ModalController, 
              private comp: ErfaringsKategorierComponent) {
                
    


        this.erfaringsVisning = "tinder";
        console.log("erfaringsvisning valgt");
  }
 
  
  segmentShownFunc(){
    this.segmentShown = !this.segmentShown;
    console.log(this.segmentShown);
    return this.segmentShown;
  }


  

}


 