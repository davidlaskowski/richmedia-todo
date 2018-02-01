var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailPage } from "../pages/detail/detail";
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(eleRef, navCtrl, navParams) {
        this.eleRef = eleRef;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentDeg = 0;
        this.items = [];
        this.containerHeight = 140;
    }
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        set: function (values) {
            var _this = this;
            if (!values.length)
                return;
            this.theta = 360 / values.length;
            this.radius = 400; //Math.round((this.containerHeight / 2) / Math.tan(Math.PI / values.length));
            this.items = values.map(function (item, index) {
                var slideItem = {
                    idx: index,
                    name: item.name,
                    description: item.description,
                    color: 'hsla(-' + _this.theta * index + ', 90%, 50%, 0.95)',
                    currentPlacement: _this.theta * index
                };
                return slideItem;
            });
            this.currentDeg = Math.round(this.currentDeg / this.theta) * this.theta;
            this.applyStyle();
        },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.prototype.swipeDown = function () {
        this.currentDeg -= this.theta;
        this.applyStyle();
    };
    CarouselComponent.prototype.swipeUp = function () {
        this.currentDeg += this.theta;
        this.applyStyle();
    };
    CarouselComponent.prototype.applyStyle = function () {
        var ele = this.eleRef.nativeElement.querySelector('.carousel');
        ele.style['-webkit-transform'] = "rotateX(" + this.currentDeg + "deg)";
        ele.style['-moz-transform'] = "rotateX(" + this.currentDeg + "deg)";
        ele.style['-o-transform'] = "rotateX(" + this.currentDeg + "deg)";
        ele.style['transform'] = "rotateX(" + this.currentDeg + "deg)";
    };
    CarouselComponent.prototype.showDetails = function (item) {
        this.navCtrl.push(DetailPage, { 'item': item }, { animation: 'md-transition', duration: 1000 });
    };
    CarouselComponent.prototype.swipeLeft = function (index) {
        this.items.splice(index, 1);
        console.log("Item gelöscht" + index);
    };
    CarouselComponent.prototype.repairCarousel = function (index, pos) {
        this.theta = 360 / this.items.length - 1;
        var i;
        var j = 0;
        var pos = this.items[index].currentPlacement;
        for (i = index + 1; i < this.items.length; i++) {
            this.items[i].idx = i;
            this.items[i].currentPlacement = pos + this.theta * j++;
        }
        for (i = 0; i < index; i++) {
            this.items[i].idx = i;
            this.items[i].currentPlacement = pos + this.theta * j++;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CarouselComponent.prototype, "slides", null);
    CarouselComponent = __decorate([
        Component({
            selector: 'carousel',
            template: "\n  <div class=\"carousel-container\">\n    <div class=\"carousel\">\n      <div swipeAll radio-group class=\"carousel-slide-item\" \n      *ngFor=\"let item of items\"\n      [style.background-color]=\"item.color\"\n      (click)=\"showDetails(item)\" \n      [ngStyle]=\"{'transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', '-webkit-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', '-ms-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)', \n      '-o-transform': 'rotateX(-'+item.currentPlacement+'deg)  translateZ('+radius+'px)'}\"\n      (swipeup)=\"swipeUp($event);\"\n      (swipedown)=\"swipeDown($event);\"\n      (swipeleft)=\"swipeLeft(item.idx);\"\n      >\n        <div class=\"slide-item slide-item-index\">\n          <p>{{item.idx+1}}</p>  \n        </div>\n        <div class=\"slide-item slide-item-name\"> \n          <p>{{item.name}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  "
        }),
        __metadata("design:paramtypes", [ElementRef, NavController, NavParams])
    ], CarouselComponent);
    return CarouselComponent;
}());
export { CarouselComponent };
//# sourceMappingURL=carousel.component.js.map