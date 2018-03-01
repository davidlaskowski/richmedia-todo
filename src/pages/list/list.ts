import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DetailPage } from "../detail/detail";
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html',
})
export class ListPage {

	private todos = [];
	private dones = [];
	mode: string = "todo";
	private af;
	private af2;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public firebaseProvider: FirebaseProvider, 
				public afAuth: AngularFireAuth,
    			public googlePlus: GooglePlus, 
    			public platform: Platform) {
		this.af = this.firebaseProvider.getAll('/todo/').subscribe(res => {
			if(res.length != 0){
				this.todos = res;
			}
		});
		this.af2 = this.firebaseProvider.getAll('/done/').subscribe(res => {
			if(res.length != 0){
				this.dones = res;
			}
		});
	}

	goToDetail(item: any, disabled){
		this.navCtrl.push(DetailPage, {'item': item, 'disabled': disabled});
	}

	goBack(){
		this.af.unsubscribe();
		this.af2.unsubscribe();
		this.navCtrl.pop();
	}

}
