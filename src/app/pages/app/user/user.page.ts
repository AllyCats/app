import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
	loaded:boolean = false;
	user:User;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertController: AlertController,
		private userService: UserService
	) { }

  ngOnInit() {
		let uuid = this.route.snapshot.paramMap.get('userUuid');
		if(uuid){
			this.getUser(uuid);
		}else{
			this.abort();
		}
  }

	async getUser(uuid:string){
		let user = await this.userService.getUser(uuid).catch((error) => {
			this.abort();
		});

		if(user){
			this.user = user;
			this.loaded = true;
		}else{
			this.abort()
		}
	}

	async abort(){
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Error',
			subHeader: 'User not found',
			message: 'This could be due to an outdated link or a mistyped URL',
			buttons: ['OK']
		});

		await alert.present();
		this.router.navigate(["/app/feed"]);
	}
}
