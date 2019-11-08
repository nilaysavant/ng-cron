import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '@ngx-prism/core';
import { QuartzCronModule } from '@sbzen/cron';

import { DocGetStartedRoutingModule } from './get-started-routing.module';
import { DocGetStartedComponent } from './get-started.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		QuartzCronModule,
		DocGetStartedRoutingModule
	],
	declarations: [
		DocGetStartedComponent
	],
	exports: [
		DocGetStartedComponent
	]
})
export class DocGetStartedModule {}
