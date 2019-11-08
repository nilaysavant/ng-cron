import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocUsageDemoComponent } from './usage-demo.component';

const routes: Routes = [
	{
		path: '',
		component: DocUsageDemoComponent
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
export class DocUsageDemoRoutingModule {}
