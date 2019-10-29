import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiMonthComponent } from './month.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiMonthComponent
  ],
  exports: [
    UiMonthComponent
  ]
})
export class UiMonthModule {}
