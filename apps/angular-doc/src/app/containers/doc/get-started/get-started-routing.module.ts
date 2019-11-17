import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocGetStartedComponent } from './get-started.component';

const routes: Routes = [
	{
		path: '',
		component: DocGetStartedComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class DocGetStartedRoutingModule {}
