import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCustomizationComponent } from './customization.component';

const routes: Routes = [
	{
		path: '',
		component: DocCustomizationComponent
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
export class DocCustomizationRoutingModule {}
