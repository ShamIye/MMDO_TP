import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface Result {
  title: string;
  author: string;
  //date: string;
  //image: string;
}

const fakeResults: Result[] =[
  {title: 'dnfkjnd1', author: ''},
  {title: 'dnfkjnd2', author: ''}
];
//Pourquoi ca ne marche pas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  results: Result[];

  constructor(){
    this.results = fakeResults;
  }
}
