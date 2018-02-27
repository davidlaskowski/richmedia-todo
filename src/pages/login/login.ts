import { Component, ViewChild } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {

 	splash = false;

 	constructor(public afAuth: AngularFireAuth, public app: App, public navCtrl: NavController, public viewCtrl: ViewController) {
 	}
 	login() {
 		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 	}
 	logout() {
 		this.afAuth.auth.signOut();
 	}

 	goToAdd(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	ionViewDidLoad() {
 		setTimeout(() => this.splash = false, 4200);
 	}

 }
