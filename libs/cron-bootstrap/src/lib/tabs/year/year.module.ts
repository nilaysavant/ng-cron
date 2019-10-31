import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YearComponent } from './year.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    YearComponent
  ],
  exports: [
    YearComponent
  ]
})
export class YearModule {}
