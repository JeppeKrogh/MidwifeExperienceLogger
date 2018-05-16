import { Component } from '@angular/core';

/**
 * Generated class for the TinderSwiperComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tinder-swiper',
  templateUrl: 'tinder-swiper.html'
})
export class TinderSwiperComponent {

  text: string;

  constructor() {
    console.log('Hello TinderSwiperComponent Component');
    this.text = 'Hello World';
  }

}
