import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from "../pages/detail/detail";
import { ToDoItem } from '../models/todo.model';
import { SlideItem } from '../models/slider.model';


@Component({
  selector: 'carousel',
  templateUrl: 'carousel.component.html'
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
      if(index<15){
        let slideItem: SlideItem = {
          idx: index,
          name: item.name,
          description: item.description,
          color: 'hsla(-' + this.theta*index + ', 90%, 50%, 0.95)',
          currentPlacement: this.theta * index
        };
        return slideItem;
      }
    })
    this.currentDeg = Math.round( this.currentDeg / this.theta ) * this.theta;
    this.applyStyle();
  }

  constructor(private eleRef: ElementRef, public navCtrl: NavController, public navParams: NavParams) {

  }

  swipeDown(event) {
    this.currentDeg -= this.theta;
    this.applyStyle();
    this.moveRight(event);
  }

  swipeUp(event) {
    this.currentDeg += this.theta;
    this.applyStyle();
    this.moveRight(event);
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

  moveLeft(event, item: any) {
    if(item.currentPlacement == this.currentDeg){
      let ele = event.target;
      if(!ele.classList.contains('slide-wrapper')){
        ele = ele.closest(".slide-wrapper");
      }
      let but = ele.nextSibling.nextSibling;
      ele.classList.add('active');
      but.classList.add('button-active');
    }
  }

  moveRight(event) {
    
      let ele = event.target;
      if(!ele.classList.contains('slide-wrapper')){
        ele = ele.closest(".slide-wrapper");
      } 
      let but = ele.nextSibling.nextSibling;
  
      ele.classList.remove('active')
      setTimeout(() => {but.classList.remove('button-active')}, 500);
      
    
  }


} 