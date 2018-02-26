import { Component } from '@angular/core';
import { ToDoItem } from '../../models/todo.model';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
//import { DatePicker } from '@ionic-native/date-picker';

import { HomePage } from '../home/home';

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
  public colors: Array<string> = ['#ff0000','#00ff00','#0000ff','#ff0000','#00ff00','#0000ff','#ff0000','#00ff00','#0000ff','#ff0000'];
  public priorities: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  
  todoItems: Observable<any[]>;
  newTodo = {} as ToDoItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider) {
     this.todoItems = this.firebaseProvider.getAll().valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  addTodo(){
    this.newTodo.color = document.querySelector('.color-item.selected').getAttribute('data-color');
    this.firebaseProvider.addItem(this.newTodo);
  }

  removeTodo(){
  }

  selectColor(event){
    let elements = Array.from(document.querySelectorAll('.color-item'));
    elements.forEach(node =>{
      node.innerHTML = "";
      node.classList.remove('selected');
    })

    event.target.innerHTML = "✓";
    event.target.classList.add("selected")
    console.log(document.querySelector('.color-item.selected').getAttribute('data-color'));
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }
  
}
