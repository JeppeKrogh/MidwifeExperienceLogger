import { Component } from '@angular/core';
import {IntroslidesPage} from '../introslides/introslides'; 
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ErfaringPage } from '../erfaring/erfaring';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  static usernameTab;
  public classReference = TabsPage;

  tab1Root = HomePage;
  tab2Root = ErfaringPage;
  tab3Root = ContactPage;
  tab4Root = IntroslidesPage;

  constructor(private _DB: DatabaseProvider,
    private afAuth: AngularFireAuth, ) {
  }

  ionViewWillLoad() {
    TabsPage.usernameTab = "loading";
    let db = firebase.firestore();
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {

        var _COLL = "users";
        var _DOC = data.uid;

        console.log(_COLL, _DOC);

        this._DB.getDocument(_COLL, _DOC)
          .then((data) => {

            if (data.length === 0) {
              console.log("doesn't exist")
            }

            else {
              TabsPage.usernameTab = data[0].user_name;
            }
          })
          .catch();
      }
    })
  }
}