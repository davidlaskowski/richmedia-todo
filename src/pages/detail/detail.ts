import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ToDoItem } from '../../models/todo.model';
import { AddPage } from '../add/add';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	private toDoItem: ToDoItem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.toDoItem = this.navParams.get('item');
  }

  ionViewDidLoad(){
  	
  	console.log(this.toDoItem);

  }

  goBack(){
  	this.navCtrl.pop({animation: 'md-transition',duration: 500});
  }

  goToAdd() {
    this.navCtrl.push(AddPage, {'item': this.toDoItem});
  }
}
