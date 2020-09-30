import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrismComponent } from './prism.component';

const COMMON_DECLARATIONS_EXPORTS = [PrismComponent];

@NgModule({
	declarations: COMMON_DECLARATIONS_EXPORTS,
	exports: COMMON_DECLARATIONS_EXPORTS,
	imports: [CommonModule]
})
export class PrismModule { }