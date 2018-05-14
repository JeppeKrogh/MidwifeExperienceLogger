import { Component } from '@angular/core';

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

  constructor(private _DB: DatabaseProvider,
    private afAuth: AngularFireAuth, ) {
  }
  
  ionViewWillLoad() {
    TabsPage.usernameTab = "loading";
    let db = firebase.firestore();
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        var docRef = db.collection("users").doc(data.uid);

        docRef.get().then(function (doc) {

          if (doc.exists) {
            TabsPage.usernameTab = doc.data().first_name + doc.data().last_name;
          }
        })
  }
    })
}
}