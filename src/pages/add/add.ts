import { Component } from '@angular/core';
import { ToDoItem } from '../../models/todo.model';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Events } from 'ionic-angular';
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

  private edit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider, private events: Events) {
     this.newTodo.priority = 1;
     this.newTodo.estimatedTime = 0;
     this.newTodo.points = 0;

     //Optional, BEARBEITUNG eines TODO's über Detail-Seite
     if(this.navParams.get('id') != undefined){
       this.newTodo.id = this.navParams.get('id');
       this.newTodo.name = this.navParams.get('name');
       this.newTodo.description = this.navParams.get('description');
       this.newTodo.priority = this.navParams.get('priority');
       //this.newTodo.duedate = this.navParams.get('duedate');
       this.newTodo.estimatedTime = this.navParams.get('estimatedTime');
       
       this.edit = true;
     }
     this.todoItems = this.firebaseProvider.getAll().valueChanges();
  }

  addTodo(){
    if(this.edit == true){
         console.log(this.newTodo)      
         this.firebaseProvider.updateItem(this.newTodo);
         this.events.publish('updateItem', this.newTodo);

    }else{
     this.firebaseProvider.addItem(this.newTodo);
     }
  }

}
