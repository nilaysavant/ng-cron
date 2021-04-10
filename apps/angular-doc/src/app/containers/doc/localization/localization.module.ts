import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QuartzCronModule } from '@sbzen/ng-cron';

import { PrismModule } from './../../../common/prism';

import { DocLocalizationRoutingModule } from './localization-routing.module';
import { DocLocalizationComponent } from './localization.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		QuartzCronModule,
		PrismModule,
		DocLocalizationRoutingModule
	],
	declarations: [
		DocLocalizationComponent
	],
	exports: [
		DocLocalizationComponent
	]
})
export class DocLocalizationModule {}
