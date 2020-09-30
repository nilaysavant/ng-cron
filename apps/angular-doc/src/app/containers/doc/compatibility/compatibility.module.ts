import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from './../../../common/prism';
import { QuartzCronModule } from '@sbzen/ng-cron';

import { DocCompatibilityRoutingModule } from './compatibility-routing.module';
import { DocCompatibilityComponent } from './compatibility.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		QuartzCronModule,
		DocCompatibilityRoutingModule
	],
	declarations: [
		DocCompatibilityComponent
	],
	exports: [
		DocCompatibilityComponent
	]
})
export class DocCompatibilityModule {}
