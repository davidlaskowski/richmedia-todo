import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from '@ionic-native/google-plus';
import { Calendar } from '@ionic-native/calendar';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

const firebaseConfig = {
    apiKey: "AIzaSyCTUi0ANMofysl-7YKVcFRvNTVcLSCHNtk",
    authDomain: "todo-8d4f0.firebaseapp.com",
    databaseURL: "https://todo-8d4f0.firebaseio.com",
    projectId: "todo-8d4f0",
    storageBucket: "todo-8d4f0.appspot.com",
    messagingSenderId: "922338825719"

};

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { CarouselComponent } from "../components/carousel.component";
import { IonicStorageModule } from '@ionic/storage';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { CalendarProvider } from '../providers/calendar/calendar';

@NgModule({
    declarations: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    LoginPage,
    ListPage,
    AboutPage,
    CarouselComponent
    ],
    imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicSwipeAllModule,
    HttpModule,
    HttpClientModule
    
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    ListPage,
    AboutPage,
    LoginPage
    ],
    providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    CalendarProvider,
    GooglePlus,
    Calendar
    ]
})
export class AppModule {}
