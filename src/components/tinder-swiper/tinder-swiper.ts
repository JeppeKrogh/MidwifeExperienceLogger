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
  SwingCardComponent} from 'angular2-swing';

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
  note: string;
  

  constructor(private requirementsService: TinderRequirementsProvider, private _DB: DatabaseProvider) {
    console.log("wow");
    this.subscription = requirementsService.requirementsSent$.subscribe(

      requirementsarray => {

        this.category = requirementsarray[0];
        this.date = requirementsarray[1];


        console.log("hello from tinder");
        console.log(this.category);
        console.log(this.date);

        if (this.category && this.date) {
          console.log("wuu we have both!");
          this.gotData = true;
          
          
          


          for (let entry of this.category) {
          var _COLL = "erfaringer/" + entry + "/Erfaringer";

          this._DB.getDocuments(_COLL)
            .then((data) => {
      
              // IF we don't have any documents then the collection doesn't exist
              // so we create it!
              if (data.length === 0) {
                console.log("nope");
              }
      
              // Otherwise the collection does exist and we assign the returned
              // documents to the public property of locations so this can be
              // iterated through in the component template
              else {
                // console.log(data);
                // var erfaringer = new Array();
                for (var key in data) {
                  this.cards.push(data[key])
                }
                console.log(this.cards);










              }
            })
            .catch();
          }









        } else {
          // this.gotData = false;
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
    // ViewChild & ViewChildren are only available
    // in this function

    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards

    // we can get the underlying stack
    // which has methods - createCard, destroyCard, getCard etc
    console.log(this.swingStack.stack);

    // and the cards
    // every card has methods - destroy, throwIn, throwOut etc
    this.swingCards.forEach((c) => console.log(c.getCard()));

    // this is how you can manually hook up to the
    // events instead of providing the event method in the template
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => console.log('Manual hook: ', event));

    this.swingStack.dragstart.subscribe((event: DragEvent) => console.log(event));

    this.swingStack.dragmove.subscribe((event: DragEvent) => console.log(event));
  }

  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent) {
    console.log('Hook from the template', event.throwDirection);
  }


}
