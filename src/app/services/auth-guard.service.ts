import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AccessToken } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
		let accessToken: AccessToken | null = JSON.parse(localStorage.getItem("accessToken") || null);

		if(!accessToken){
			this.router.navigate(['']);
			return false;
		}

		const now =  new Date().getTime() / 1000;//Current unix in seconds
		if(now > accessToken.expires){
			this.router.navigate(['']);
			return false;
		}

    return true;
  }
}
