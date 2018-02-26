import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider : FirebaseProvider, private events: Events) {
    this.firebaseProvider.getAll().valueChanges().subscribe(res => {
      console.log(res);
      if(res.length != 0){
        res.forEach(this.calculatePoints);
        res.sort(function(a: ToDoItem, b: ToDoItem){return b.points - a.points});
        while(res.length>20)
          res.pop();
        
        this.slides = res;
      }
    });
  }

//Algorithmus zur Ermittelung der Wertigkeiten eines TODO's
calculatePoints(item: ToDoItem){
  var daysleft;
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  if(item.duedate!=undefined){
    var dueDate = new Date(item.duedate);
    var dueTime = dueDate.getTime();
    daysleft = Math.round((dueTime - currentTime)/86400000);
  }

  if(item.estimatedTime==undefined||item.estimatedTime==0){
    if(daysleft<=0||daysleft==undefined){
      item.points = Math.pow(item.priority, 2);
    }else{
      item.points = Math.pow(item.priority, 3)/(Math.sqrt(daysleft));
      if(daysleft<item.priority)
        item.points += daysleft * (item.priority - daysleft);
    }
  }else{
    if(daysleft<=0||daysleft==undefined){
      console.log("was soll das");
      item.points = item.priority * item.estimatedTime / 2;
    }else{
      item.points = Math.pow(item.priority,2) * item.estimatedTime / daysleft;
      if(daysleft<item.priority)
        item.points += daysleft * (item.priority - daysleft);
    }
  }
}
//Umleitung auf die Hinzufügen-Seite 
goToAdd(){
  this.navCtrl.push(AddPage);
}

}
