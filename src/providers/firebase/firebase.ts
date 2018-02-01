import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToDoItem } from '../../models/todo.model.ts';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public angularFireDatabase: AngularFireDatabase) {
    }

  getAll() {
    return this.angularFireDatabase.list('/todo/');
  }
 
  addItem(todoItem: ToDoItem) {
    this.angularFireDatabase.list('/todo/').push(todoItem);
  }
 
  removeItem(id) {
    this.angularFireDatabase.list('/todo/').remove(id);
  }
}
