import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				loadChildren: () => import('./containers/home/home.module').then(mod => mod.HomeModule)
			},
			{
				path: 'doc',
				loadChildren: () => import('./containers/doc/doc.module').then(mod => mod.DocModule)
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			relativeLinkResolution: 'legacy',
			anchorScrolling: 'enabled',
			scrollPositionRestoration: 'enabled',
			scrollOffset: [0, 50]
		})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
