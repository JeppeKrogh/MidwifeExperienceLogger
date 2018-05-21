import { Component, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TinderRequirementsProvider } from "../../providers/tinder-requirements/tinder-requirements";
import { DatabaseProvider } from "../../providers/database/database";
import { ToastController, AlertController  } from 'ionic-angular';
import { Erfaring } from '../../models/erfaring';
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

@Component({
  selector: 'tinder-swiper',
  templateUrl: 'tinder-swiper.html'
})
export class TinderSwiperComponent {

  erfaring = {} as Erfaring;

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
  erfaringer = [];

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

        if (this.category && this.date) {
          console.log("We have both!");
          this.gotData = true;
          let db = firebase.firestore();
          this._DB.getDocuments("erfaringer")
            .then((data) => {
              if (data.length === 0) {
                console.log("nope");
              }
              else {
                var kategorier = new Array();
                for (let entry of this.category) {
                  for (var key in data) {
                    if (data[key].kategoriNummer == entry) {
                      this.cards.push(data[key])
                    }
                  }
                }
              }
            })
            .catch();
        } else {
          console.log("aww, we don't have both yet");
          this.gotData = true;
        }

      }
    );

    this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      // allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 1.7), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    }
  }

  ngAfterViewInit() {
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => this.threwOutLeft(event));

    this.swingStack.throwoutright.subscribe(
      (event: ThrowEvent) => this.threwOutRight(event));
  }

  threwOutRight(event: ThrowEvent) {
    this.afAuth.authState.subscribe(res => {
      let db = firebase.firestore();
      let path = "users/" + res.uid + "/erfaringer";
      db.collection(path).doc().set({
        id: event.target.attributes['id'].value
      })
    });

    let toast = this.toastCtrl.create({
      message: 'Erfaring Tilføjet 🤩',
      duration: 33000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

  }
  threwOutLeft(event: ThrowEvent) {

  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Tilknyt note til erfaring',
      inputs: [
        {
          name: 'note',
          placeholder: 'Skriv din note her! (max 200 tegn)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Tilføj Note',
          handler: data => {
            if (data > "") {
              console.log("you typed something!")
              console.log(data);
            } else {
              console.log("you typed nothing!")
              console.log(data);
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }



}
