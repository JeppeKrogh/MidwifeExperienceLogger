import { Component, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TinderRequirementsProvider } from "../../providers/tinder-requirements/tinder-requirements";
import { DatabaseProvider } from "../../providers/database/database";
import { ToastController, AlertController, ViewController } from 'ionic-angular';
// import { Erfaring } from '../../models/erfaring';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  Direction,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

@Component({
  selector: 'tinder-swiper',
  templateUrl: 'tinder-swiper.html'
})
export class TinderSwiperComponent {

  // erfaring = {} as Erfaring;

  [x: string]: any;
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards = [];
  stackConfig: StackConfig;
  category = '<no data yet>';
  date: any;
  categoryNumber: any;
  subscription: Subscription;
  gotData: boolean = false;
  erfaringer: any;
  note: string;
  internship: any;
  addedNote: boolean = false;
  thisEntry: any;


  constructor(
    private requirementsService: TinderRequirementsProvider,
    private _DB: DatabaseProvider,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.subscription = requirementsService.requirementsSent$.subscribe(



      requirementsarray => {
        this.category = requirementsarray[0];
        this.date = requirementsarray[1];

        this.note = "";
        this.cards = [];
        if (this.category && this.date) {
          this.gotData = true;
          let db = firebase.firestore();
          for (let entry of this.category) {
            let path = "erf/kat" + entry + "/kat" + entry;
            this._DB.getDocuments(path)
              .then((data) => {
                if (data.length === 0) {
                  console.log("no data");
                }
                else {
                  for (var key in data) {
                    this.cards.push({
                      name : data[key],
                      number : entry})
                  }
                  

                }
              })
              .catch();
          }
        } else {
          console.log("aww, we don't have both yet");
        }
      }
    );

    this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      // allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        // return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 1.7), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 4), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);

      },
      throwOutDistance: (d) => {
        return 800;
      }
    }
  }

  ngAfterViewInit() {

    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => {
        this.threwOutLeft(event)

      });

    this.swingStack.throwoutright.subscribe(
      (event: ThrowEvent) => {
        this.threwOutRight(event)
      });











  }

  threwOutRight(event: ThrowEvent) {
    this.afAuth.authState.subscribe(res => {

      let path1 = "users/" + res.uid;
      this._DB.getDocument("users", res.uid)
        .then((data) => {
          if (data.length === 0) {
            console.log("no data");
          }
          else {

            for (var key in data) {
              console.log(data[key].student_semester);
            }
            if (data[key].student_semester <= 3) {
              this.internship = 1;
            } else if (data[key].student_semester > 3 && data[key].student_semester <= 5) {
              this.internship = 2;
            } else if (data[key].student_semester > 5 && data[key].student_semester <= 7) {
              this.internship = 3;
            }
            let db = firebase.firestore();
            let path = "users/" + res.uid + "/erfaringer";
            db.collection(path).doc().set({
              navn: event.target.attributes['data-name'].value,
              note: this.note,
              id: event.target.attributes['data-id'].value,
              time: this.date,
              internship: this.internship,
              parent: +event.target.attributes['data-parent'].value,
            })
          }
        })
        .catch();
    });


    let toast = this.toastCtrl.create({
      message: 'Erfaring Tilføjet',
      duration: 1000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      this.note = "";
      this.addedNote = false;
    });
    toast.present();

    setTimeout(function () {
      event.target.remove();
      
    }, 600);

    
  }
  threwOutLeft(event: ThrowEvent) {
    this.note = "";
    setTimeout(function () {
      event.target.remove();
    }, 600);

  }
  
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Tilknyt Note',
      inputs: [
        {
          name: 'note',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Slet note',
          role: 'cancel',
          handler: data => {
            this.note = "";
            this.addedNote = false;
          }
        },
        {
          text: 'Tilføj Note',
          handler: data => {
            if (data > "") {
              this.note = data.note;
              this.addedNote = true;
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  public switchView() {
    this.gotData = !this.gotData;
  }
  public swipeLeftClick() {

    var hest = document.getElementById('stack');
    var vest = hest.lastElementChild;
    vest.classList.add('rolloutLeft');
    setTimeout(function () {
      vest.remove();
      if (hest.childElementCount == 0) {
        this.gotData = false;
      }
    }, 600);


  }
  public swipeRightClick() {
    this.swingCards.last.getCard().throwOut(800, 0);
    var hest = document.getElementById('stack');
    var vest = hest.lastElementChild;
    vest.classList.add('rolloutRight');

    setTimeout(function () {
      vest.remove();
      if (hest.childElementCount == 0) {
        let toast = this.toastCtrl.create({
          message: 'Færdig med alle erfaringer',
          duration: 4000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log("dismissed. Hvad nu?")
        });
        toast.present();
      }
    }, 600);
  }

}