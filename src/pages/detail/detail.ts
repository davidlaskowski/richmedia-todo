import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ToDoItem } from '../../models/todo.model';
import { AddPage } from '../add/add';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private toDoItem: ToDoItem;
  private time = undefined;
  private disabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, public firebaseProvider: FirebaseProvider) {
    this.toDoItem = this.navParams.get('item');
    this.disabled = this.navParams.get('disabled');
    this.events.subscribe('updateItem', (values) => {
      this.toDoItem = values;
      this.convertToTime();
    });
    this.convertToTime();
    
  }


  goBack(){
    this.navCtrl.pop({animation: 'md-transition',duration: 500});
  }

  convertToTime(){
    if(this.toDoItem.estimatedTime!=undefined&&this.toDoItem.estimatedTime!=0){
      var date = new Date(this.toDoItem.estimatedTime);
      var hh: any = date.getUTCHours();
      var mm: any = date.getUTCMinutes();
      if (hh < 10) {hh = "0"+hh;}
      if (mm < 10) {mm = "0"+mm;}
      this.time = hh + ":" + mm; 

    }
  }

//Entfernen eines TODO's
  removeItem(){
    this.firebaseProvider.removeItem(this.toDoItem.id);
    this.events.publish('deleteItem');
    this.navCtrl.pop();
  }

//Umleitung auf die Hinzufügen-Seite zur BEARBEITUNG
goToAdd() {
  this.navCtrl.push(AddPage, {'id': this.toDoItem.id, 'name': this.toDoItem.name, 'description': this.toDoItem.description, 'priority': this.toDoItem.priority, 'duedate': this.toDoItem.duedate, 'estimatedTime': this.toDoItem.estimatedTime, 'color': this.toDoItem.color});
}
}
