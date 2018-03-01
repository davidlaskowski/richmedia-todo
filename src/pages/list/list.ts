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
	mode: string = "todo";

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.firebaseProvider.getAll('/todo/').subscribe(res => {
			if(res.length != 0){
				this.todos = res;
			}
		});
		this.firebaseProvider.getAll('/done/').subscribe(res => {
			if(res.length != 0){
				this.dones = res;
			}
		});
	}

	goToDetail(item: any, disabled){
		this.navCtrl.push(DetailPage, {'item': item, 'disabled': disabled});
	}

	goBack(){
		this.navCtrl.pop();
	}

}
