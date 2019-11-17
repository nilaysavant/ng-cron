import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DeviceService } from './../../shared/device.service';
import { NavModule } from './../../shared/nav/nav.module';
import { HeaderModule } from './../../shared/header/header.module';

import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		DocRoutingModule,

		HeaderModule,
		NavModule
	],
	declarations: [
		DocComponent
	],
	exports: [
		DocComponent
	],
	providers: [
		DeviceService
	]
})
export class DocModule {}
