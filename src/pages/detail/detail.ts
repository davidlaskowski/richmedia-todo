import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ToDoItem } from '../../models/todo.model';
import { AddPage } from '../add/add';

 @Component({
   selector: 'page-detail',
   templateUrl: 'detail.html',
 })
 export class DetailPage {

   private toDoItem: ToDoItem;

   constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
     this.toDoItem = this.navParams.get('item');
     this.events.subscribe('updateItem', (values) => {
       this.toDoItem = values;
     });
   }

//Anzeigen/Ausblenden der verschiedenen Parameter eines TODO's
   ionViewDidEnter(){
     if(this.toDoItem.description == undefined || this.toDoItem.description == ""){
       let ele = document.getElementById('description');
       ele.classList.add('disable');
     }else{
       let ele = document.getElementById('description');
       ele.classList.remove('disable');
     }
     if(this.toDoItem.duedate == undefined || this.toDoItem.duedate == ""){
       let ele = document.getElementById('duedate');
       ele.classList.add('disable');
     }else{
       let ele = document.getElementById('duedate');
       ele.classList.remove('disable');
     }
     if(this.toDoItem.estimatedTime == undefined || this.toDoItem.estimatedTime == 0){
       let ele = document.getElementById('estimatedTime');
       ele.classList.add('disable');
     }else{
       let ele = document.getElementById('estimatedTime');
       ele.classList.remove('disable');
     }

   }

   goBack(){
     this.navCtrl.pop({animation: 'md-transition',duration: 500});
   }

//Umleitung auf die Hinzufügen-Seite zur BEARBEITUNG
   goToAdd() {
     this.navCtrl.push(AddPage, {'id': this.toDoItem.id, 'name': this.toDoItem.name, 'description': this.toDoItem.description, 'priority': this.toDoItem.priority, 'duedate': this.toDoItem.duedate, 'estimatedTime': this.toDoItem.estimatedTime});
   }
 }
