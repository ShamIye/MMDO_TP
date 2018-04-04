import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { api_key } from '../../app/tmdb';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';

export interface Result {
  title: string;
  poster_path: string;
  release_date: string;
  adult: boolean;
  original_title: string;
  original_language: string;
  id: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  results: Observable<Result[]>;
  pushPage: typeof DetailsPage;

  constructor(private http: HttpClient){
    this.pushPage = DetailsPage;
    this.results = Observable.of([]);
  }
  getItems(ev: any) {
    //set val to teh vamlue of the searchbar
    let val = ev.target.value;
    if(val)
      this.results = this.fetchResults(val);
    else
      this.results = Observable.of([]);
  }

  fetchResults(search: string): Observable<Result[]>{
    let url: string = 'https://api.themoviedb.org/3/search/movie'
    return this.http.get<Result[]>(url,{
      params :{
        api_key: api_key,
        query: search,
        language : 'fr',
      }
    }).pluck('results');
  }
}
