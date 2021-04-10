import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCustomizationCssStylingComponent } from './css-styling.component';

const routes: Routes = [
	{
		path: '',
		component: DocCustomizationCssStylingComponent
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
export class DocCustomizationCssStylingRoutingModule {}
