import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';

import { AddPage } from '../add/add';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';

import { AboutPage } from '../about/about';
import { CarouselComponent } from "../../components/carousel.component";
import { Events } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToDoItem } from '../../models/todo.model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private slides = [];
  private loading: any;
  af

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public firebaseProvider: FirebaseProvider, 
    private events: Events, 
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
     public googlePlus: GooglePlus, 
     public platform: Platform) {
    this.af = this.firebaseProvider.getAll('/todo/').subscribe(res => {
      if(res.length != 0){
        res.forEach(this.calculatePoints);
        res.sort(function(a: ToDoItem, b: ToDoItem){return b.points - a.points});
        while(res.length>20)
          res.pop();
        
        this.slides = res;
        this.loading.dismiss();
      }else{
        this.slides = [];
        this.loading.dismiss();
      }
    });
  }

  ionViewDidLoad(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

//Algorithmus zur Ermittelung der Wertigkeiten eines TODO's
calculatePoints(item: ToDoItem){
  var daysleft = undefined;
  var timeNeeded = undefined;
  var currentDate = new Date();
  var currentTime = currentDate.getTime();

  //Tage bis Due Date
  if(item.duedate!=""){
    var dueDate = new Date(item.duedate);
    var dueTime = dueDate.getTime();
    daysleft = (dueTime - currentTime)/86400000;
  }

  if(item.estimatedTime!=undefined){
    timeNeeded = item.estimatedTime / 3600000;
  }

  if(item.estimatedTime==undefined||item.estimatedTime==0){
    //Estimated Time nicht verfügbar
    if(daysleft<=0||daysleft==undefined){
      //Due Date nicht verfügbar
      item.points = Math.pow(item.priority, 2);
    }else{
      //Due Date verfügbar
      item.points = Math.pow(item.priority, 3)/(Math.sqrt(daysleft));
      if(daysleft<item.priority)
        item.points += Math.pow((item.priority - daysleft),2);
    }
  }else{
    //Estimated Time verfügbar
    if(daysleft<=0||daysleft==undefined){
      //Due Date nicht verfügbar
      item.points = item.priority * timeNeeded;
    }else{
      //Due Date verfügbar
      item.points = Math.pow(item.priority,2) * timeNeeded / daysleft;
      if(daysleft<item.priority)
        item.points += Math.pow((item.priority - daysleft),2);
    }
  }
  item.points = Math.round(item.points);
}
//Umleitung auf Add-Page
goTo(){
  this.navCtrl.push(AddPage);
}

//Umleitung auf List-Page
goToList(){
  this.navCtrl.push(ListPage);
}

//Umleitung auf About-Page
goToAbout(){
  this.navCtrl.push(AboutPage);
}

//Umleitung auf Option-Page
logout(){
  this.af.unsubscribe();
  this.afAuth.auth.signOut();
     if(this.platform.is('cordova')){
       this.googlePlus.logout();
     }
  this.navCtrl.setRoot(LoginPage);
}

//Rücksprung auf 1 Element
center(){
  this.events.publish("centerItem");
}

}
