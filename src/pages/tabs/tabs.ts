import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ErfaringPage } from '../erfaring/erfaring';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ErfaringPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;

  constructor() {

  }
}
