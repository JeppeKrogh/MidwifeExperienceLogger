import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EfaringsdetailjerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-efaringsdetailjer',
  templateUrl: 'efaringsdetailjer.html',
})
export class EfaringsdetailjerPage {

  items = [
    // 'erfaring 1',
    // 'erfaring 2',
    // 'erfaring 3',
    // 'erfaring 4',
    // 'erfaring 5',
    // 'erfaring 6',
    // 'erfaring 7',
    // 'erfaring 8',
    // 'erfaring 9',
    // 'erfaring 10'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EfaringsdetailjerPage');
  }

}
