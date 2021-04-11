import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocComponent } from './doc.component';

const routes: Routes = [
	{
		path: '',
		component: DocComponent,
		children: [
			{
				path: '',
				redirectTo: 'get-started'
			},
			{
				path: 'get-started',
				loadChildren: () => import('./get-started/get-started.module').then(mod => mod.DocGetStartedModule)
			},
			{
				path: 'usage-demo',
				loadChildren: () => import('./usage-demo/usage-demo.module').then(mod => mod.DocUsageDemoModule)
			},
			{
				path: 'cron-format',
				loadChildren: () => import('./cron-format/cron-format.module').then(mod => mod.DocCronFormatModule)
			},
			{
				path: 'customization',
				loadChildren: () => import('./customization/customization.module').then(mod => mod.DocCustomizationModule)
			},
			{
				path: 'localization',
				loadChildren: () => import('./localization/localization.module').then(mod => mod.DocLocalizationModule)
			},
			{
				path: 'api-reference',
				loadChildren: () => import('./api-reference/api-reference.module').then(mod => mod.DocApiReferenceModule)
			},
			{
				path: 'compatibility',
				loadChildren: () => import('./compatibility/compatibility.module').then(mod => mod.DocCompatibilityModule)
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
export class DocRoutingModule {}
