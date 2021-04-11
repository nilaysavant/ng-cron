import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '../../../../common/prism';
import { QuartzCronModule, UnixCronModule } from '@sbzen/ng-cron';

import { DocCustomizationCssStylingRoutingModule } from './css-styling-routing.module';
import { DocCustomizationCssStylingComponent } from './css-styling.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		UnixCronModule,
		QuartzCronModule,
		DocCustomizationCssStylingRoutingModule
	],
	declarations: [
		DocCustomizationCssStylingComponent
	],
	exports: [
		DocCustomizationCssStylingComponent
	]
})
export class DocCustomizationCssStylingModule {}
