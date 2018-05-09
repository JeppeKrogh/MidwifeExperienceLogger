import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePickerDirective } from 'ion-datepicker';
/**
 * Generated class for the ErfaringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-erfaring',
  templateUrl: 'erfaring.html',
  providers: [DatePickerDirective],
})
export class ErfaringPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }


  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate: Date = new Date();

  public Log(): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date: Date) {
    this.initDate = date;
  }
  

      
  ionViewDidLoad() {
    console.log('ionViewDidLoad ErfaringPage');
  }

  

}


 