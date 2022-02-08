import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService, AuthToken, AccessToken, User } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	private testUser:User = environment.testUser;
	errorMessage: string = "";

	userForm: FormGroup = new FormGroup(
		{
			email: new FormControl(
				this.testUser.email, 
				Validators.required
			),
			password: new FormControl(
				this.testUser.password, 
				Validators.required
			)
		}
	)
  constructor(
		private authService: AuthService,
		private router: Router,
		private loadingController: LoadingController
	) { }

  ngOnInit() {
  }

	async login(){
		if(this.userForm.valid){
			this.errorMessage = "";

			const loading = await this.loadingController.create({
				cssClass: 'my-custom-class',
				message: 'Please wait...'
			});

			await loading.present();

			const authToken: AuthToken | void = await this.authService.getAuthToken().catch((error) => {
				this.errorMessage = error.message ? error.message : "Unable to authenticate at this time - try again later";
			});

			if(authToken){
				let user = {
					email: this.userForm.controls["email"].value,
					password: this.userForm.controls["password"].value,
					nickName: ""
				}

				let accessToken: AccessToken | void = await this.authService.getAccessToken(authToken.authToken, user).catch((error) => {
					this.errorMessage = error.message ? error.message : "Invalid username or password";
				});

				if(accessToken){
					accessToken.expires += new Date().getTime() / 1000;//set expiration (reguardless of local time)
					this.userForm.reset();
					this.authService.accessToken = accessToken;
					localStorage.setItem("accessToken", JSON.stringify(accessToken));
					this.router.navigate(["app/feed"]);
				}
			}

			loading.dismiss();
		}
	}
}
