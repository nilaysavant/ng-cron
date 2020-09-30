import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from './../../../common/prism';
import { QuartzCronModule } from '@sbzen/ng-cron';

import { DocUsageDemoRoutingModule } from './usage-demo-routing.module';
import { DocUsageDemoComponent } from './usage-demo.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		QuartzCronModule,
		DocUsageDemoRoutingModule
	],
	declarations: [
		DocUsageDemoComponent
	],
	exports: [
		DocUsageDemoComponent
	]
})
export class DocUsageDemoModule {}
