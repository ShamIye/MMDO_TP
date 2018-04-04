import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  results: Result[];
  pushPage: typeof DetailsPage;

  constructor(){
    this.pushPage = DetailsPage;
    this.results = fakeResults;
  }
  getItems(ev: any) {
    //set val to teh vamlue of the searchbar
    let val = ev.target.value;
    return val ? this.results = fakeResults : this.results = [];
  }
}
