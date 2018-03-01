import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { ToDoItem } from '../../models/todo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseProvider {

  userId: string;
  idToken: string;
  list: Observable<any>;

  constructor(public afAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
    
  }
    //Anfrage an Firebase abhängig von gegebenen "path"
    getAll(path: string){
      this.userId = firebase.auth().currentUser.uid;
      return this.angularFireDatabase.list('/users/' + this.userId + path).valueChanges();
    }

    //Hinzufügen von Item in Firebase zu "Todo"
    addItem(toDoItem: ToDoItem) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').push(toDoItem).then((snap) => {
        toDoItem.id = snap.key;
        this.angularFireDatabase.object('/users/' + this.userId + '/todo/' + toDoItem.id).update(toDoItem);
      });

    }

    //Hinzufügen von Item in Firebase zu "Done"
    doneItem(toDoItem: ToDoItem){
      this.angularFireDatabase.list('/users/'+ this.userId + '/done/').push(toDoItem);
    }

    //Anpassen eines Items in Firebase
    updateItem(toDoItem) {
      this.angularFireDatabase.object('/users/' + this.userId + '/todo/'+ toDoItem.id).update(toDoItem);
    }

    //Löschen eines Items in Firebase
    removeItem(id) {
      this.angularFireDatabase.list('/users/' + this.userId + '/todo/').remove(id);
    }
  }
