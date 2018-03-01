import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from "angularfire2/database"; 
import { ToDoItem } from '../../models/todo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


interface User{
  uid: string;
  email: string;
  displayName?: string;
}
  @Injectable()
  export class FirebaseProvider {

    userId: string;
    idToken: string;
    list: Observable<any>;

    constructor(public afAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
    }

    getAll(path: string){
      this.userId = firebase.auth().currentUser.uid;
      return this.angularFireDatabase.list('/users/' + this.userId + path).valueChanges();
    }

    addItem(toDoItem: ToDoItem) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').push(toDoItem).then((snap) => {
        toDoItem.id = snap.key;
        this.angularFireDatabase.object('/users/' + this.userId + '/todo/' + toDoItem.id).update(toDoItem);
      });

    }

    doneItem(toDoItem: ToDoItem){
      this.angularFireDatabase.list('/users/'+ this.userId + '/done/').push(toDoItem);
    }

    updateItem(toDoItem) {
      this.angularFireDatabase.object('/users/' + this.userId + '/todo/'+ toDoItem.id).update(toDoItem);
    }

    removeItem(id) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').remove(id);
    }
  }
