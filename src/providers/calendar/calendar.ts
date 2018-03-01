import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular';
/*
  Generated class for the CalendarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class CalendarProvider {

    calendars = [];

    constructor(
      public http: HttpClient,
      public calendar: Calendar,
      public platform: Platform
      ) {

      this.platform.ready().then(() => {
        this.calendar.listCalendars().then(data => {
          this.calendars = data;
        });
      })
    }


    initialize(){
      this.calendar.createCalendar('todo').then(
        (msg) => { alert(msg); },
        (err) => { alert(err); }
        );
    }

    addEvent(title,location,notes,startDate,endDate){
      var options = this.calendar.getCalendarOptions();
this.calendar.listCalendars().then(res => {
options.calendarId = res[0].id;
this.calendar.createEventWithOptions(title, location, notes, this.toDate(startDate), this.toDate(endDate), options);
});
      // let options = this.calendar.getCalendarOptions();
      // this.calendar.listCalendars().then(res => {
      //   console.log(res[0].id);
      //   options.calendarName = "todo";
      //   options.calendarId = res[0].id;
      //   //options.firstReminderMinutes = 1440;
      //   this.calendar.createEventWithOptions(title, location, notes, this.toDate(startDate), this.toDate(endDate), options);
      // }, function(res) {
      //   alert('error : ' + res);
      // }); 
}

listCalendars(){
  console.log("Calendars:")
  console.log(this.calendars);
}

getCalendarOptions(){
  console.log(this.calendar.getCalendarOptions());
}

toDate(dateStr) {
  console.log(dateStr.toString());
  var parts = dateStr.toString().split("-");
  console.log("DATE:");
  console.log(parts[0]);
  console.log(parts[1]-1);
  console.log(parts[2]);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}
}
