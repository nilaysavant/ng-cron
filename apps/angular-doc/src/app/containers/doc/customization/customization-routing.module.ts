import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCustomizationComponent } from './customization.component';

const routes: Routes = [
	{
		path: '',
		component: DocCustomizationComponent,
		children: [
			{
				path: '',
				redirectTo: 'visibility-inputs'
			},
			{
				path: 'css-styling',
				loadChildren: () => import('./css-styling/css-styling.module').then(m => m.DocCustomizationCssStylingModule)
			},
			{
				path: 'visibility-inputs',
				loadChildren: () => import('./visibility-inputs/visibility-inputs.module').then(m => m.DocCustomizationVisibilityInputsModule)
			}
		]
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
