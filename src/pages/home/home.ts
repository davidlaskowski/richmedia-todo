import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AddPage } from '../add/add';
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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public firebaseProvider: FirebaseProvider, 
              private events: Events, 
              public loadingCtrl: LoadingController) {
    this.firebaseProvider.getAll().subscribe(res => {
      console.log(res);
      this.loading.dismiss();
      if(res.length != 0){
        res.forEach(this.calculatePoints);
        res.sort(function(a: ToDoItem, b: ToDoItem){return b.points - a.points});
        while(res.length>20)
          res.pop();
        
        this.slides = res;
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
  var daysleft;
  var timeNeeded;
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  //Tage bis Due Date
  if(item.duedate!=undefined){
    var dueDate = new Date(item.duedate);
    var dueTime = dueDate.getTime();
    daysleft = Math.round((dueTime - currentTime)/86400000);
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
        item.points += daysleft * (item.priority - daysleft);
    }
  }else{
    //Estimated Time verfügbar
    if(daysleft<=0||daysleft==undefined){
      //Due Date nicht verfügbar
      item.points = item.priority * timeNeeded / 2;
    }else{
      //Due Date verfügbar
      item.points = Math.pow(item.priority,2) * timeNeeded / daysleft;
      if(daysleft<item.priority)
        item.points += daysleft * (item.priority - daysleft);
    }
  }
  item.points = Math.round(item.points);
}
//Umleitung auf die Hinzufügen-Seite 
goToAdd(){
  this.navCtrl.push(AddPage);
}

}
