import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the IntroslidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introslides',
  templateUrl: 'introslides.html',
})
export class IntroslidesPage {
  @ViewChild(Slides) slides:Slides;
  skipMsg: string ="Skip";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  skip() {
    this.navCtrl.setRoot(TabsPage); 
  }

  slideChanged() {
    if(this.slides.isEnd())
    this.skipMsg = "Alright, i got it";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroslidesPage');
  }

}

