import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from "../pages/detail/detail";
import { ToDo } from '../models/todo';


interface SlideItem {
  idx: number;
  name: string,
  description: string;
  color?: string;
  currentPlacement: number
}


@Component({
  selector: 'carousel',
  template: `
    <div class="carousel-container">
      <div class="carousel">
        <div swipeAll radio-group class="carousel-slide-item" 
        *ngFor="let item of items"
        (click)="showDetails(item)"
        [style.background-color]="item.color" 
        [ngStyle]="{'transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-webkit-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-ms-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)', 
        '-o-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)'}"
        (swipeup)="swipeUp($event);"
        (swipedown)="swipeDown($event);"
        >
          <p style="top: 50%, transform: translateY(-50%);">{{item.name}}</p>
 
        </div>
      </div>
    </div>
  `
})
export class CarouselComponent {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private containerHeight: number = 200;
  private tz: number;
  private tx: number;
  private toDoItem: ToDo;

  @Input() set slides(values: Array<ToDo>) {
    if (!values.length) return;

    let degree: number = 0;
    this.tx = 360 / values.length;
    this.tz = Math.round((this.containerHeight / 2) / Math.tan(Math.PI / values.length));
    this.items = <Array<SlideItem>>values.map((item: ToDo, index: number) => {
      let slideItem = {
        idx: index,
        name: item.name,
        description: item.description,
        color: item.color,
        currentPlacement: degree
      };
      degree = degree + this.tx;
      return slideItem;
    })
  }

  constructor(private eleRef: ElementRef, public navCtrl: NavController, public navParams: NavParams) {
   }

  swipeDown() {
    this.currentDeg = this.currentDeg - this.tx;
    this.applyStyle();
  }

  swipeUp() {
    this.currentDeg = this.currentDeg + this.tx;
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
    this.navCtrl.push(DetailPage, {'item': item});
  }

} 