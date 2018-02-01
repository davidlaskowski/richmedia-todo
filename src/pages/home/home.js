var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPage } from '../add/add';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //max Objects 15
        this.slides = [{
                name: '1. Objekt',
                description: 'Ashutosh',
                color: '#630460',
            },
            {
                name: '2. Objekt',
                description: 'Saina',
                color: '#0072bc',
            },
            {
                name: '3. Objekt',
                description: 'Sakshi',
                color: '#39b54a',
            },
            {
                name: '4. Objekt',
                description: 'Sushil',
                color: '#f26522',
            },
            {
                name: '5. Objekt',
                description: 'Sindhu',
                color: '#ed1c24',
            },
            {
                name: '6. Objekt',
                description: 'Sindhu',
                color: '#ed1c24',
            },
            {
                name: '7. Objekt',
                description: 'Ashutosh',
                color: '#630460',
            },
            {
                name: '8. Objekt',
                description: 'Saina',
                color: '#0072bc',
            },
            {
                name: '9. Objekt',
                description: 'Sakshi',
                color: '#39b54a',
            },
            {
                name: '10. Objekt',
                description: 'Sushil',
                color: '#f26522',
            },
            {
                name: '11. Objekt',
                description: 'Sindhu',
                color: '#ed1c24',
            },
            {
                name: '12. Objekt',
                description: 'Ashutosh',
                color: '#630460',
            },
            {
                name: '13. Objekt',
                description: 'Saina',
                color: '#0072bc',
            },
            {
                name: '14. Objekt',
                description: 'Sakshi',
                color: '#39b54a',
            },
            {
                name: '15. Objekt',
                description: 'Sushil',
                color: '#f26522',
            }
        ];
    }
    HomePage.prototype.goToAdd = function () {
        this.navCtrl.push(AddPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map