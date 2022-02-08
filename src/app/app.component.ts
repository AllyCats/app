import { Component } from '@angular/core';
import { AuthService, AuthToken, AccessToken } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
		private authService: AuthService
	) {
		//this.checkConnection();
		//this.login();
	}

	async checkConnection(){
		let result = await this.authService.getAuthToken();
		if(result){
			this.authService.connected = 'connected';
		}else{
			this.authService.connected = 'failed';
		}
	}


}
