import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { api_key } from '../../app/tmdb';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';


export interface Result {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
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
  //pushPage: typeof DetailsPage;
  pushPage: any;
  private shakeSubscription: Subscription;
  constructor(public navCtrl: NavController, private http: HttpClient, public alertCtrl: AlertController, public platform: Platform, private shake: Shake){
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

  private discoverMovies(): Observable<Result[]> {
    let url: string = 'https://developers.themoviedb.org/3/discover/movie-discover'
    return this.http.get<Result[]>(url, {
      params: {
        api_key: api_key,
        //query: search,
        language: 'fr',
        primary_release_year: '2018'
      }
    }).pluck('results');
  }

  private showRandomMovieAlert(movies:Result[]): void {
    var item = movies[Math.floor(Math.random() * movies.length)];
    let confirm = this.alertCtrl.create({
      title: item.title,
      message: item.overview,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.pushPage, item);
          }
        }
      ]
    });
    confirm.present();
    return ;
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
      .switchMap(() => this.shake.startWatch())
      .switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }
}
