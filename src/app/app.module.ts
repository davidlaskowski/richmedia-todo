import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicSwipeAllModule } from 'ionic-swipe-all';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { DetailPage } from '../pages/detail/detail';
import { CarouselComponent } from "../components/carousel.component";
import { IonicStorageModule } from '@ionic/storage';
import { TodoProvider } from '../providers/todo/todo';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
    }),
    IonicSwipeAllModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoProvider
  ]
})
export class AppModule {}
