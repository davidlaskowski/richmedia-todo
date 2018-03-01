import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular';

@Injectable()
export class CalendarProvider {

  calendarId : any;
  calendars = [];

  constructor(
    public http: HttpClient,
    public calendar: Calendar,
    public platform: Platform
    ) {
    
  }

  initialize(){
    this.calendar.requestReadWritePermission();
    this.calendar.createCalendar('todo');      
  }

  addEvent(title,location,notes,startDate,endDate){
    let options = this.calendar.getCalendarOptions();
    this.calendar.listCalendars().then(res =>{
      for(var i = 0; i < res.length; i++){
        if(res[i].name === "todo"){
          options.calendarId = res[i].id;
          this.calendar.createEventWithOptions(title,location,notes,this.toDate(startDate),this.toDate(endDate),options);
        }
      }
    });
  }

  toDate(dateStr) {
    var parts = dateStr.toString().split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
}
