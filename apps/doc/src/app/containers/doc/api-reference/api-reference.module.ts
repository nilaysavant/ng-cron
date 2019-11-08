import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrismModule } from '@ngx-prism/core';

import { DocApiReferenceRoutingModule } from './api-reference-routing.module';
import { DocApiReferenceComponent } from './api-reference.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		PrismModule,
		DocApiReferenceRoutingModule
	],
	declarations: [
		DocApiReferenceComponent
	],
	exports: [
		DocApiReferenceComponent
	]
})
export class DocApiReferenceModule {}
