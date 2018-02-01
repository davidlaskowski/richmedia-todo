import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPage } from '../add/add';
import { CarouselComponent } from "../../components/carousel.component";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  //max Objects 15
  private slides = [{
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

  goToAdd(){
    this.navCtrl.push(AddPage);
  }


}
