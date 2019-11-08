import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourComponent } from './hour.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		HourComponent
	],
	exports: [
		HourComponent
	]
})
export class HourModule {}
