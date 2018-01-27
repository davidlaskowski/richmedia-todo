import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
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
	todo: Todo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
     this.todo = {
       name: '',
       description: ''
     }
  }

  logForm(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  test(){
  	//this.navCtrl.pop(this); 
  }
  
}
