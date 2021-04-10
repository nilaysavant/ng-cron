import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocLocalizationComponent } from './localization.component';

const routes: Routes = [
	{
		path: '',
		component: DocLocalizationComponent
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
export class DocLocalizationRoutingModule {}
