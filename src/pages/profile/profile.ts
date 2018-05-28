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
  @ViewChild('barCanvas') barCanvas;

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
        labels: ["1", "2", "3", "4", "5", "6"],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
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
  }
  showModal(value) {
    console.log(value);
    const modal = this.modalCtrl.create('ModalContentPage', { value: value });
    // let modal = this.modalCtrl.create('ModalContentPage');
    modal.present();

  }




}
