import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { Events, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from "../pages/detail/detail";
import { ToDoItem } from '../models/todo.model';
import { SlideItem } from '../models/slider.model';
import { FirebaseProvider } from '../providers/firebase/firebase';


@Component({
  selector: 'carousel',
  templateUrl: 'carousel.component.html'
})
export class CarouselComponent {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private containerHeight: number = 116;
  private radius: number;
  private theta: number;
  private activeIndex: number = 0;

  @Input() set slides(values: Array<ToDoItem>) {
    if (!values.length) return;

    this.setSlides(values);    
  }

  constructor(private eleRef: ElementRef, public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, public events: Events) {
    this.events.subscribe('deleteItem', _=> {

      if(this.items.length<=1)
        this.items.pop();
      this.activeIndex--;
      if(this.activeIndex > this.items.length - 1)
        this.activeIndex = this.items.length - 1;
      if(this.activeIndex < 0)
        this.activeIndex = 0;
    })
    this.events.subscribe('centerItem', _=> {
      this.activeIndex = 0;
      this.currentDeg = 0;
      this.applyStyle();
    })
  }

  setSlides(values: Array<ToDoItem>){
    this.theta = 360 / values.length;
    this.radius = 400;
    this.items = <Array<SlideItem>>values.map((item: ToDoItem, index: number) => {

      let slideItem: SlideItem = {
        idx: index,
        id: item.id,
        name: item.name,
        description: item.description,
        priority: item.priority,
        points: item.points,
        duedate: item.duedate,
        estimatedTime: item.estimatedTime,
        color: item.color,
        currentPlacement: this.theta * index
      };
      return slideItem;
      
    })
    this.currentDeg = Math.round( this.currentDeg / this.theta ) * this.theta;
    this.applyStyle();
  }

//Funktion für die Swipe-Bewegung nach UNTEN
swipeDown(event) {
  this.currentDeg -= this.theta;
  this.activeIndex--;
  if(this.activeIndex<0)
    this.activeIndex = this.items.length-1;
  this.applyStyle();
  this.moveRight(event);
}

//Funktion für die Swipe-Bewegung nach OBEN
swipeUp(event) {
  this.currentDeg += this.theta
  this.activeIndex++;
  if(this.activeIndex > this.items.length-1)
    this.activeIndex = 0;
  this.applyStyle();
  this.moveRight(event);
}

//Funktion für die visuelle Drehung des Carousels
private applyStyle() {
  let ele = this.eleRef.nativeElement.querySelector('.carousel');
  ele.style[ '-webkit-transform' ] = "rotateX(" + this.currentDeg + "deg)";
  ele.style[ '-moz-transform' ] = "rotateX(" + this.currentDeg + "deg)";
  ele.style[ '-o-transform' ] = "rotateX(" + this.currentDeg + "deg)";
  ele.style[ 'transform' ] = "rotateX(" + this.currentDeg + "deg)";
}

//Umleitung auf die DETAIL-Seite eines TODO's
showDetails(item: any){
  if(this.activeIndex == item.idx){
    this.navCtrl.push(DetailPage, {'item': item, 'disabled': false}, {animation: 'md-transition',duration: 1000});
  }
}

//Funktion zum LÖSCHEN eines TODO's
delete(item: any) {
  let toDoItem: ToDoItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    priority: item.priority,
    duedate: item.duedate,
    estimatedTime: item.estimatedTime,
    color: item.color,
    points: item.points
  }
  
  this.events.publish('deleteItem');
  this.firebaseProvider.doneItem(toDoItem);
  this.firebaseProvider.removeItem(item.id); 
  
}

//Funktion für die Swipe-Bewegung nach LINKS, Bewegen des TODO's nach Links und Anzeigen des Löschen-Buttons
moveLeft(event, item: any) {
  if(this.activeIndex == item.idx){
    let ele = event.target;
    if(!ele.classList.contains('slide-wrapper')){
      ele = ele.closest(".slide-wrapper");
    }

    let but = ele.nextSibling.nextSibling;
    ele.classList.add('active');
    but.classList.add('button-active');
  }
}

//Funktion für die Swipe-Bewegung nach RECHTS, Bewegen des TODO's nach rechts und Ausblenden des Löschen-Buttons
moveRight(event) {
  let ele = event.target;
  if(!ele.classList.contains('slide-wrapper')){
    ele = ele.closest(".slide-wrapper");
  } 

  let but = ele.nextSibling.nextSibling;
  ele.classList.remove('active')
  setTimeout(() => {but.classList.remove('button-active')}, 300);
}


} 