import { Component } from '@angular/core';
import { ToDoItem } from '../../models/todo.model';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})

export class AddPage {
	private toDoItem: ToDoItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
     this.toDoItem = {
       name: '',
       description: ''
     }
  }

  logForm(){
  }

  test(){
  	//this.navCtrl.pop(this); 
  }
  
}
