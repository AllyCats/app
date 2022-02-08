import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPage } from './app.page';

const routes: Routes = [
  {
    path: '',
    component: AppPage,
		children: [
			{
				path: 'feed',
				loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
			},
			{
				path: 'events',
				loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
			},
			{
				path: 'users/:userUuid',
				loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
			}
		]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPageRoutingModule {}
