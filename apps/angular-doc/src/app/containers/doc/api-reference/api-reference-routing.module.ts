import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocApiReferenceComponent } from './api-reference.component';

const routes: Routes = [
	{
		path: '',
		component: DocApiReferenceComponent
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
export class DocApiReferenceRoutingModule {}
