import { Component } from '@angular/core';
import { ToDoItem } from '../../models/todo.model';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
//import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})

export class AddPage {
  public color: string = '#ffa500';
  public colors: Array<string> = ['#ff0000','#00ff00','#0000ff'];

  todoItems: Observable<any[]>;
  newTodo = {} as ToDoItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider) {
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
