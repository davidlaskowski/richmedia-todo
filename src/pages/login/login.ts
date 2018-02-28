import { Component, ViewChild } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

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

 	user: Observable<firebase.User>

 	constructor(public afAuth: AngularFireAuth, public app: App, public navCtrl: NavController, public viewCtrl: ViewController, public googlePlus: GooglePlus, public platform: Platform) {
 		this.user = this.afAuth.authState;
 	}

 	async nativeGoogleLogin(): Promise<void>{
 		try{
 			const gplusUser = await this.googlePlus.login({
 				'webClientId': '922338825719-3o75d8f3so7gis34vmru45a8tsq42tbp.apps.googleusercontent.com',
 				'offline': true
 			})

 			return await this.afAuth.auth.signInWithCredential(
 				firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
 				)
 		} catch(err){
 			console.log(err);
 		}
 	}

 	async webGoogleLogin(): Promise<void> {
 		try{
 			const provider = new firebase.auth.GoogleAuthProvider();
 			const credential = await this.afAuth.auth.signInWithPopup(provider);
 		} catch(err){
 			console.log(err);
 		}
 		
 	}

 	googleLogin(){
 		if(this.platform.is('cordova')){
 			this.nativeGoogleLogin().then( (data) => {
 	 			this.navCtrl.setRoot(HomePage);
 			});
 			
 		} else {
 			this.webGoogleLogin().then( (data) => {
 	 			this.navCtrl.setRoot(HomePage);
 			});
 		}

 	}

 	signOut(){
 		this.afAuth.auth.signOut();
 		if(this.platform.is('cordova')){
 			this.googlePlus.logout();
 		}

 	}

 	continue(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	login() {
 		alert("Login pressed");
 		this.googlePlus.login({
 			'webClientId': '922338825719-3o75d8f3so7gis34vmru45a8tsq42tbp.apps.googleusercontent.com',
 			'offline': true
 		}).then(res=>{
 			firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
 				.then(suc=>{
					alert("Login Success");
 					this.navCtrl.push("HomePage");
 				}).catch(ns=>{
 					alert("Login not successfull");
 				})
 		})
 		//this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 	}
 	logout() {
 		this.afAuth.auth.signOut();
 	}

 	goToAdd(){
		this.navCtrl.push("HomePage");
 	}
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad LoginPage');
 	}

 	testlogin(){
 
        this.googlePlus.login({
          'webClientId': '922338825719-3o75d8f3so7gis34vmru45a8tsq42tbp.apps.googleusercontent.com'
        }).then((res) => {
        	this.navCtrl.push(HomePage);
            console.log(res);
        }, (err) => {
            console.log(err);
        });
 
    }
 
    testlogout(){
 
        this.googlePlus.logout().then(() => {
            console.log("logged out");
        });
 
    }

 }
