import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface Result {
  title: string;
  author: string;
  image: string;
}

const fakeResults: Result[] =[
  {title: 'dnfkjnd1', author: ''},
  {title: 'dnfkjnd2', author: ''}
];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
