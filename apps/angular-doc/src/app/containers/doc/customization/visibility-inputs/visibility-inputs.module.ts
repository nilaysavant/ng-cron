import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '../../../../common/prism';
import { QuartzCronModule, UnixCronModule } from '@sbzen/ng-cron';

import { DocCustomizationVisibilityInputsRoutingModule } from './visibility-inputs-routing.module';
import { DocCustomizationVisibilityInputsComponent } from './visibility-inputs.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		UnixCronModule,
		QuartzCronModule,
		DocCustomizationVisibilityInputsRoutingModule
	],
	declarations: [
		DocCustomizationVisibilityInputsComponent
	],
	exports: [
		DocCustomizationVisibilityInputsComponent
	]
})
export class DocCustomizationVisibilityInputsModule {}
