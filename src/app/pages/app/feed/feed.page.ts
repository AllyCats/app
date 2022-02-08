import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { FeedService, Feed } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	items: Feed[] = [];
	private limit:number = 10;
	private maxFeeds:number = 1000;
	private page:number = 0;
	public loaded:boolean = false;
	public sampleData: any[] = [];

  constructor(
		private feedService: FeedService
	) { }

  ngOnInit() {
		for(let i = 0; i < 15; i++){
			this.sampleData.push({});
		}
		this.intialFeed();
  }

	async intialFeed(){
		await this.getFeed();
		this.loaded = true;
	}

	async getFeed(){
		this.page++;
    let feedData: Feed[] = await this.feedService.getFeed(this.limit, this.page);
		if(feedData){
			for(let feed of feedData){
				this.items.push(feed);
			}
		}

		return feedData;
	}

	async loadData(event) {
		let feedData = await this.getFeed();

		if (feedData.length < this.limit || this.items.length > this.maxFeeds) {
			event.target.disabled = true;
		}

		event.target.complete();
  }
}
