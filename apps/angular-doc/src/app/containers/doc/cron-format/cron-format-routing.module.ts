import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocCronFormatComponent } from './cron-format.component';

const routes: Routes = [
	{
		path: '',
		component: DocCronFormatComponent
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
export class DocCronFormatRoutingModule {}
