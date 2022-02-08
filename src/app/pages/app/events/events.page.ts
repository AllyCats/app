import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EventService, Event } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	items: Event[] = [];
	private limit:number = 10;
	private maxEvents:number = 1000;
	private page:number = 0;
	public loaded:boolean = false;
	public sampleData: any[] = [];
	public failed: boolean = false;

  constructor(
		private eventService: EventService
	) { }

  ngOnInit() {
		for(let i = 0; i < 15; i++){
			this.sampleData.push({});
		}
		this.intialEvents();
  }

	async intialEvents(){
		await this.getEvents();
		this.loaded = true;
	}

	async getEvents(){
		this.page++;
    let eventData: Event[] | void = await this.eventService.getEvents(this.limit, this.page).catch((error) =>{
			this.failed = true;
		});

		if(eventData){
			for(let event of eventData){
				this.items.push(event);
			}
		}

		return eventData ? eventData : [];
	}

	async loadData(event) {
		let eventData = await this.getEvents();

		if (eventData.length < this.limit || this.items.length > this.maxEvents) {
			event.target.disabled = true;
		}

		event.target.complete();
  }

}
