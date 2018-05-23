import { Component, ViewChild } from '@angular/core';
import { NavController, ItemSliding , ModalController } from 'ionic-angular';
import {  } from "../login/login";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Chart} from 'chart.js';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public isSearchBarOpened = false;

  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  information: any[];
  constructor(public navCtrl: NavController, private http:Http, public myModal:ModalController) {


    //dummy json data. her skal man connect med rigtig database til den endelige version
   //   let localDate = this.http.get('assets/information.json').map(res => res.json().items);
   //   localDate.subscribe(data => {
   //     this.information = data;
   //   });
   
  }

  

  showModal() {
   
    const modal = this.myModal.create('ModalContentPage');
    modal.present();

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
 ionViewDidLoad() {
 
  this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["1", "2", "3","4", "5", "6"],
          backgroundColor:'rgba(255, 99, 132, 0.2)',
          borderColor:'rgba(255, 99, 132, 0.2)',
          datasets: [{
              label: '# of days',
              data: [12, 19, 3, 5, 2, 3, 4, 7, 4, 2],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
          }
      }

  });

}


}
