import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCompatibilityComponent } from './compatibility.component';

const routes: Routes = [
	{
		path: '',
		component: DocCompatibilityComponent
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
export class DocCompatibilityRoutingModule {}
