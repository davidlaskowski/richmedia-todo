import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  todoItems: Observable<any[]>;
  newTodo = {} as Todo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public firebaseProvider: FirebaseProvider) {
     this.todoItems = this.firebaseProvider.getAll().valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  addTodo(){
    this.firebaseProvider.addItem(this.newTodo);
  }

  removeTodo(){
    
  }
  
}
