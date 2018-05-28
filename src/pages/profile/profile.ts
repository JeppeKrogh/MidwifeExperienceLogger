import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, DateTime } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Chart } from 'chart.js';


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

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public myModal: ModalController) {

    var date = new Date();

    this.afAuth.authState.subscribe(res => {
      let db = firebase.firestore();
      // let path = "users/" + res.uid;
      db.collection("users").doc(res.uid).get().then(function (doc) {
        if (doc.exists) {
          console.log("du er på: " + doc.data().student_semester + ". semester!");
     
          

          console.log("Document data:", doc.data().student_date);
          // console.log("today: " + today);
          // console.log(doc.data().student_date);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
       
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

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
  showModal() {

    const modal = this.myModal.create('ModalContentPage');
    modal.present();

  }




}
