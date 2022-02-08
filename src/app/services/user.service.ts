import { Injectable }   from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
	HttpParams}         from '@angular/common/http';
import { Observable, of }   from 'rxjs';
import { catchError }   from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
		private authService: AuthService
  ) { }

	async getUser(uuid:string): Promise<User> {
		return new Promise((resolve, reject) => {
			this.getUserRequest(uuid).subscribe(result => {
				if(result){
					resolve(result);
				}else{
					reject({message: "Unable to get user"})
				}
			});
		});
	}

	getUserRequest(uuid:string): Observable<User> {
    return this.http.get<User>(
      this.apiUrl + "/users/" + uuid,
			{
				headers: new HttpHeaders()
					.set('Authorization', 'Bearer ' + this.authService.accessToken!.accessToken)
			},
    ).pipe(
        catchError(this.authService.handleError<User>('getUserRequest'))
    );
  }
}
