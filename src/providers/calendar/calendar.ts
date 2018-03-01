import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
/*
  Generated class for the CalendarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalendarProvider {
  
  constructor(public http: HttpClient, public calendar:Calendar) {
    console.log('Hello CalendarProvider Provider');
  }


  initialize(){
  	this.calendar.createCalendar('todo').then(
	  (msg) => { console.log(msg); },
	  (err) => { console.log(err); }
	);
  }
  addEvent(title,location,notes,startDate,endDate){
  	this.calendar.createEvent(title, location, notes, startDate, endDate);
  }

}
