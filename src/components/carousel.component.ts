import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from "../pages/detail/detail";
import { ToDoItem } from '../models/todo.model';
import { SlideItem } from '../models/slider.model';


@Component({
  selector: 'carousel',
  template: `
  <div class="carousel-container">
  <ion-list class="carousel">
  <div swipeAll class="carousel-slide-item" 
  *ngFor="let item of items"
  [style.background-color]="item.color"
  (click)="showDetails(item)" 
  [ngStyle]="{'transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', '-webkit-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', '-ms-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', 
  '-o-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)'}"
  (swipeup)="swipeUp($event);"
  (swipedown)="swipeDown($event);"
  (swipeleft)="delete(item.idx);"
  >
  <div class="slide-item slide-item-index">
    <p>{{item.idx+1}}</p>  
  </div>
  <div class="slide-item slide-item-name"> 
    <p>{{item.name}}</p>
  </div>
  </div>
  </ion-list>
  </div>
  `
})
export class CarouselComponent {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private containerHeight: number = 140;
  private radius: number;
  private theta: number;
  private ToDoItem: ToDoItem;

  @Input() set slides(values: Array<ToDoItem>) {
    if (!values.length) return;

    this.theta = 360 / values.length;
    this.radius = 400;//Math.round((this.containerHeight / 2) / Math.tan(Math.PI / values.length));
    this.items = <Array<SlideItem>>values.map((item: ToDoItem, index: number) => {
      let slideItem: SlideItem = {
        idx: index,
        name: item.name,
        description: item.description,
        color: 'hsla(-' + this.theta*index + ', 90%, 50%, 0.95)',
        currentPlacement: this.theta * index
      };
      return slideItem;
    })
    this.currentDeg = Math.round( this.currentDeg / this.theta ) * this.theta;
    this.applyStyle();
  }

  constructor(private eleRef: ElementRef, public navCtrl: NavController, public navParams: NavParams) {

  }

  swipeDown() {
    this.currentDeg -= this.theta;
    this.applyStyle();
  }

  swipeUp() {
    this.currentDeg += this.theta;
    this.applyStyle();
  }

  private applyStyle() {
    let ele = this.eleRef.nativeElement.querySelector('.carousel');
    ele.style[ '-webkit-transform' ] = "rotateX(" + this.currentDeg + "deg)";
    ele.style[ '-moz-transform' ] = "rotateX(" + this.currentDeg + "deg)";
    ele.style[ '-o-transform' ] = "rotateX(" + this.currentDeg + "deg)";
    ele.style[ 'transform' ] = "rotateX(" + this.currentDeg + "deg)";
  }

  showDetails(item: any){
    if(item.currentPlacement == this.currentDeg)
      this.navCtrl.push(DetailPage, {'item': item}, {animation: 'md-transition',duration: 1000});
  }

  delete(index: number) {
    if(this.items[index].currentPlacement == this.currentDeg){


      this.items.splice(index, 1);
      this.repairCarousel(index);

      console.log("Item gelöscht"+ index);
    }
  }

  repairCarousel(index: number) {
    this.theta = 360 / this.items.length;
    var i;
    var j = 0;
    var pos = this.items[index].currentPlacement;
    this.currentDeg = pos;
    this.applyStyle();

    for(i=index; i < this.items.length; i++){
      this.items[i].idx = i;
      this.items[i].currentPlacement = pos + this.theta * j++;
    }

    for(i=0; i < index; i++){
      this.items[i].idx = i;
      this.items[i].currentPlacement = pos + this.theta * j++;
    }
    
  }

} 