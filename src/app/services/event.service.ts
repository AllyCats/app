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
export class EventService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
		private authService: AuthService
  ) { }

	async getEvents(limit:number, page:number): Promise<Event[]> {
		return new Promise((resolve, reject) => {
			this.getEventsRequest(limit, page).subscribe(result => {
				if(result){
					resolve(result);
				}else{
					reject({message: "Unable to get events"})
				}
			});
		});
	}

	getEventsRequest(limit: number, page:number): Observable<Event[]> {
    return this.http.get<Event[]>(
      this.apiUrl + "/events",
			{
				headers: new HttpHeaders()
						.set('Authorization', 'Bearer ' + this.authService.accessToken!.accessToken),
				params: new HttpParams()
					.set('limit', limit)
					.set('page', page)
			},
    ).pipe(
        catchError(this.authService.handleError<Event[]>('getEventsRequest'))
    );
  }
}

export interface Event{

}