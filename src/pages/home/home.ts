import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CarouselComponent } from "../../components/carousel.component";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  private slides = [{
      id: 4,
      description: 'Ashutosh',
      color: '#630460',
      isSelected: false,
    },
    {
      id: 1,
      description: 'Saina',
      color: '#0072bc',
      isSelected: false,
    },
    {
      id: 2,
      description: 'Sakshi',
      color: '#39b54a',
      isSelected: false,
    },
    {
      id: 3,
      description: 'Sushil',
      color: '#f26522',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
    }
  ];

}
