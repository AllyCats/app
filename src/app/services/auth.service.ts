import { Injectable }   from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders }         from '@angular/common/http';
import { Observable, of }   from 'rxjs';
import { catchError }   from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	public connected: string = 'checking';
	public accessToken: AccessToken | null;

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { 
		this.accessToken = JSON.parse(localStorage.getItem("accessToken") || null);
	}

	async getAuthToken():Promise<AuthToken> {
		return new Promise((resolve, reject) => {
			this.getAuthTokenRequest().subscribe(result => {
				if(result){
					resolve(result);
				}else{
					reject({message: "Unable to authenticate at this time - try again later"})
				}
			});
		});
	}

	getAuthTokenRequest(): Observable<AuthToken> {
    return this.http.get<AuthToken>(
      this.apiUrl + "/login",
    ).pipe(
        catchError(this.handleError<AuthToken>('getAuthToken'))
    );
  }

  async getAccessToken(token:string, user:User): Promise<AccessToken> {
		return new Promise((resolve, reject) => {
			this.getAccessTokenRequest(token, user).subscribe(result => {
				if(result){
					resolve(result);
				}else{
					reject({message: "Invalid username or password"})
				}
			});
		});
	}

	getAccessTokenRequest(token: string, user:User): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      this.apiUrl + "/login",
			user,
			{
				headers: new HttpHeaders()
						.set('Authorization', 'Bearer ' + token),
			},
    ).pipe(
        catchError(this.handleError<AccessToken>('getAccessTokenRequest'))
    );
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        if(error.status == 401){
          //this.signout();
        }
        //this.notificationService.showError(error.error.message, "Error");
        return of(result as T);
    };
  }
}

export interface AuthToken{
  authToken:string;
  expires:number;
}

export interface AccessToken{
  accessToken:string;
  expires:number;
}

export interface User{
	nickName:string;
	email:string;
	password:string;
}