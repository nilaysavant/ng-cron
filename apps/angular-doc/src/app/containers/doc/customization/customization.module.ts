import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from './../../../common/prism';
import { QuartzCronModule } from '@sbzen/ng-cron';

import { DocCustomizationRoutingModule } from './customization-routing.module';
import { DocCustomizationComponent } from './customization.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		QuartzCronModule,
		DocCustomizationRoutingModule
	],
	declarations: [
		DocCustomizationComponent
	],
	exports: [
		DocCustomizationComponent
	]
})
export class DocCustomizationModule {}
