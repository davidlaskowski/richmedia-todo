import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { IonicSwipeAllModule } from 'ionic-swipe-all';

export interface CourselItem {
  description: string;
  color?: string
}

interface SlideItem {
  idx: number;
  description: string;
  color?: string;
  currentPlacement: number
}


@Component({
  selector: 'carousel',
  template: `
    <div class="carousel-container">
      <div class="carousel">
        <div swipeAll (click)="showDetails()" radio-group class="carousel-slide-item" 
        *ngFor="let item of items"
        [style.background-color]="item.color" 
        [ngStyle]="{'transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-webkit-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-ms-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)', 
        '-o-transform': 'rotateX('+item.currentPlacement+'deg)  translateZ('+tz+'px)'}"
        (swipeup)="swipeUp($event);"
        (swipedown)="swipeDown($event);"
        >
          <p>{{item.description}}</p>
 
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

  @Input() set slides(values: Array<CourselItem>) {
    if (!values.length) return;

    let degree: number = 0;
    this.tx = 360 / values.length;
    this.tz = Math.round((this.containerHeight / 2) / Math.tan(Math.PI / values.length));
    this.items = <Array<SlideItem>>values.map((item: CourselItem, index: number) => {
      let slideItem = {
        idx: index,
        description: item.description,
        color: item.color,
        currentPlacement: degree
      };
      degree = degree + this.tx;
      return slideItem;
    })
  }

  constructor(private eleRef: ElementRef) {
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

} 