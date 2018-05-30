import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, DateTime, Modal } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Chart } from 'chart.js';
import { ModalContentPage } from '../modal-content/modal-content';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public isSearchBarOpened = false;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;


  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public modalCtrl: ModalController) {

    var date = new Date();

    this.afAuth.authState.subscribe(res => {





      let db = firebase.firestore()
      let path = "users/" + res.uid + "/erfaringer";
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      console.log(today);
      db.collection(path).where("time", "==", date)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot) {
            console.log("sorry, no data");
          } else {
            querySnapshot.docs.forEach(docSnap => {
              console.log("date is: " + docSnap.data());


            })
            console.log("else this");

          }
        })

    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');



    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Dag 1", "Dag 2", "Dag 3", "Dag 4", "Dag 5", "Dag 6"],
        datasets: [{
          backgroundColor: 'rgba(7, 213, 189, 1)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          label: 'Erfaringer',
          data: [32, 49, 23, 17, 22, 13, 24, 47, 14, 22],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: ["Svangreomsorg (gen)", "Anden svangreomsorg", "Barselsomsorg (gen)", "Anden barselsomsorg", "Fødselshjælp", "Gynækologi", "Gynækologi (diaN)", "Dokumentation og rapportering" ],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3, 3, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(35, 169, 24, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      }

  });
  }
  showModal(value) {
    console.log(value);
    const modal = this.modalCtrl.create('ModalContentPage', { value: value });
    // let modal = this.modalCtrl.create('ModalContentPage');
    modal.present();

  }




}
