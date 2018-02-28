import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DetailPage } from "../detail/detail";

@Component({
	selector: 'page-list',
	templateUrl: 'list.html',
})
export class ListPage {

	private todos = [];
	private dones = [];
	mode: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.firebaseProvider.getAll().valueChanges().subscribe(res => {
			if(res.length != 0){
				this.todos = res;
			}
		});
	}

	goToDetail(item: any){
		this.navCtrl.push(DetailPage, {'item': item});
	}

}
