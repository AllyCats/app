import { Injectable }   from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
	HttpParams}         from '@angular/common/http';
import { Observable, of }   from 'rxjs';
import { catchError }   from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
		private authService: AuthService
  ) { }

	async getFeed(limit:number, page:number): Promise<Feed[]> {
		return new Promise((resolve, reject) => {
			this.getFeedRequest(limit, page).subscribe(result => {
				if(result){
					resolve(result);
				}else{
					reject({message: "Unable to get feed"})
				}
			});
		});
	}

	getFeedRequest(limit: number, page:number): Observable<Feed[]> {
    return this.http.get<Feed[]>(
      this.apiUrl + "/feed",
			{
				headers: new HttpHeaders()
						.set('Authorization', 'Bearer ' + this.authService.accessToken!.accessToken),
				params: new HttpParams()
					.set('limit', limit)
					.set('page', page)
			},
    ).pipe(
        catchError(this.authService.handleError<Feed[]>('getFeedRequest'))
    );
  }
}

export interface Feed{

}
