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
      this.calendar.requestReadWritePermission();
      this.calendar.createCalendar('todo').then(
        (msg) => { alert(msg); },
        (err) => { alert(err); }
        );
    }

    addEvent(title,location,notes,startDate,endDate){
      
      let title2 = "testevent";
      let eventLocation = "";
      let notes2 = "test";
      let startDate2 = new Date(2018,3,15,0,0,0);
      let endDate2 = new Date(2018,3,15,0,0,0);

      let options = this.calendar.getCalendarOptions();
      options.recurrence ="true";
      //this.calendar.listCalendars().then(res => {
          options.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
  options.secondReminderMinutes = 5;

  // Added these options in version 4.2.4:
  options.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly
  options.recurrenceEndDate = new Date(2018,10,1,0,0,0,0); // leave null to add events into infinity and beyond
  options.calendarName = "MyCreatedCalendar"; // iOS only

  // This is new since 4.2.7:
  options.recurrenceInterval = 2;
          // on iOS the success handler receives the event ID (since 4.3.6)
  for(var i=1; i <= 10; i++){
      options.calendarId = i;
      this.calendar.createEventWithOptions(title2,eventLocation,notes2,startDate2,endDate2,options);
  }

  // create an event interactively
  //this.calendar.createEventInteractively(title2,eventLocation,notes2,startDate2,endDate2);

  // create an event interactively with the options object as shown above
  //this.calendar.createEventInteractivelyWithOptions(title2,eventLocation,notes2,startDate2,endDate2,options);

  // create an event in a named calendar (iOS only, deprecated, use createEventWithOptions instead)
  //this.calendar.createEventInNamedCalendar(title2,eventLocation,notes2,startDate2,endDate2,"todo");

 //this.calendar.createEventInteractively();
      //});
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
