import { Component } from '@angular/core';
import { ToDoItem } from '../../models/todo.model';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})

export class AddPage {
  public colors: Array<string> = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c'];
  
  todoItems: Observable<any[]>;

  newTodo: ToDoItem = {
    id:"",
    name:"",
    description:"",
    priority:1,
    estimatedTime:0,
    duedate:"",
    color:""
  };

  private edit: boolean = false;
  private time = "00:00";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public firebaseProvider: FirebaseProvider, 
    private events: Events, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

     //Optional, BEARBEITUNG eines TODO's über Detail-Seite
     if(this.navParams.get('id') != undefined){
       this.newTodo.id = this.navParams.get('id');
       this.newTodo.name = this.navParams.get('name');
       this.newTodo.description = this.navParams.get('description');
       this.newTodo.priority = this.navParams.get('priority');
       this.newTodo.duedate = this.navParams.get('duedate');
       this.newTodo.estimatedTime = this.navParams.get('estimatedTime');
       this.newTodo.color = this.navParams.get('color');
       
       this.convertToTime();

       this.edit = true;
     }
     this.todoItems = this.firebaseProvider.getAll().valueChanges();
   }

//Hinzufügen eines TODO's
addTodo(){
  if(this.isEntryValid()){
    if(this.edit == true){  
      this.firebaseProvider.updateItem(this.newTodo);
      this.events.publish('updateItem', this.newTodo);

    }else{
      this.firebaseProvider.addItem(this.newTodo);
    }
    this.presentToast();
    this.goBack();
  }
}

goBack(){
   this.navCtrl.pop();
}

//Funktion zum Konvertieren eines Time-Formats in einen Timestamp
estimatedTime(){
  var date = new Date("1970-01-01T"+this.time+":00Z");
  this.newTodo.estimatedTime = date.getTime();
}

//Funktion zum Auswählen einer Farbe
selectColor(event, item){
  let elements = Array.from(document.querySelectorAll('.color-item'));
  elements.forEach(node =>{
    node.classList.remove('selected');
  })

  event.target.classList.add("selected");
  this.newTodo.color = item;
}

//Funktion zum Prüfen der Validierung
isEntryValid(){
  let errorMessage: string = "Please ";
  if(this.newTodo.name == undefined || this.newTodo.name == ""){
    errorMessage += "enter a name!";
    this.errorAlert(errorMessage);
    return false;
  }
  if(this.newTodo.color == undefined){
    errorMessage += "pick a color!";
    this.errorAlert(errorMessage);
    return false;
  }
  return true;
}

//Alert bei Invaliden Input
errorAlert(error){
  let alert = this.alertCtrl.create({
    title: 'Invalid input',
    message: error,
    buttons: ['Dismiss']
  })
  alert.present();
}

//Funktion zum konvertieren eines Timestamps in ein Time-Format
convertToTime(){
  if(this.newTodo.estimatedTime!=undefined){
    var date = new Date(this.newTodo.estimatedTime);
    var hh: any = date.getUTCHours();
    var mm: any = date.getUTCMinutes();
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    this.time = hh + ":" + mm; 
  }
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'TODO was added successfully',
    duration: 3000,
    position: 'bottom'
  });


    toast.present();
}
}
