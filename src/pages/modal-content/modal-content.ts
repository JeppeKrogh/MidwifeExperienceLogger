import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  closeModal () {
    this.view.dismiss();
    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
  }

}
