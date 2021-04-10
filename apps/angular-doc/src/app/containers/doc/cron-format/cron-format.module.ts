import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from './../../../common/prism';
import { QuartzCronModule, UnixCronModule } from '@sbzen/ng-cron';

import { DocCronFormatRoutingModule } from './cron-format-routing.module';
import { DocCronFormatComponent } from './cron-format.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		UnixCronModule,
		QuartzCronModule,
		DocCronFormatRoutingModule
	],
	declarations: [
		DocCronFormatComponent
	],
	exports: [
		DocCronFormatComponent
	]
})
export class DocCronFormatModule {}
