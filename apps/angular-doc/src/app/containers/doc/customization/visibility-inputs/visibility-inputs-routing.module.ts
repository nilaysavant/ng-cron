import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCustomizationVisibilityInputsComponent } from './visibility-inputs.component';

const routes: Routes = [
	{
		path: '',
		component: DocCustomizationVisibilityInputsComponent
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
export class DocCustomizationVisibilityInputsRoutingModule {}
