import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToDo } from '../../models/todo';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	private toDoItem: ToDo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.toDoItem = this.navParams.get('item');
  }

  ionViewDidLoad(){
  	
  	console.log(this.toDoItem);

  }

  goBack(){
  	this.navCtrl.pop(this);
  }
}
