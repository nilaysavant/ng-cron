import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartzCronDayComponent } from './day.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		QuartzCronDayComponent
	],
	exports: [
		QuartzCronDayComponent
	]
})
export class QuartzCronDayModule {}
