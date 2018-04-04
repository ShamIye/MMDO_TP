import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

export interface Result {
  title: string;
  author: string;
  //date: string;
  image: string;
}

const fakeResults: Result[] =[
  { title: 'dnfkjnd1', author: '', image:'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/11880512_929939130419296_4742120412934412702_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeE3FZVdrHNcImMbyfTIkJ6OaEtK0WfGzAYIM2PhE-hewCYIdxt37gq-9pSikqdV8kkMbJwFIB1rAE-5fOJFtjkb2DSE_BrQg8YI3UEUp-EQnA&oh=f1fdd3fbfc696d2f159da6ccc802a07d&oe=5B69D597'},
  {title: 'dnfkjnd2', author: '', image:''}
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
