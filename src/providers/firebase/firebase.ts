import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Todo } from '../../models/todo';

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
 
  addItem(todoItem: Todo) {
    this.angularFireDatabase.list('/todo/').push(todoItem);
  }
 
  removeItem(id) {
    this.angularFireDatabase.list('/todo/').remove(id);
  }
}