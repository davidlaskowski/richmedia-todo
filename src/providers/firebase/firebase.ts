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
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class FirebaseProvider {

    userId: string;
    idToken: string;
    list: Observable<any>;

    constructor(public afAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
    }

    getAll(){
      this.userId = firebase.auth().currentUser.uid;
      console.log("test");
      
      console.log(this.userId)
      this.list = this.angularFireDatabase.list('/users/' + this.userId + '/todo/').valueChanges();
      this.list.subscribe((response) => {
        if (response.length == 0) {
          this.angularFireDatabase.database.ref('users/' + this.userId).set({
            todo:"todo",
            done:"done"
          })
        }
      });
      return this.list;
    }

    search(start, end){
      return this.angularFireDatabase.list('/users/' + this.userId + '/todo/', ref => ref.orderByChild("name").startAt(start).endAt(end));  
    }

    addItem(toDoItem: ToDoItem) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').push(toDoItem).then((snap) => {
        toDoItem.id = snap.key;
        this.angularFireDatabase.object('/users/' + this.userId + '/todo/' + toDoItem.id).update(toDoItem);
      });

    }

    updateItem(toDoItem) {
      this.angularFireDatabase.object('/users/' + this.userId + '/todo/'+ toDoItem.id).update(toDoItem);
    }

    removeItem(id) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').remove(id);
    }
  }
