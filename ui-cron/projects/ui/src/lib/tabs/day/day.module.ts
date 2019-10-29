import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiDayComponent } from './day.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiDayComponent
  ],
  exports: [
    UiDayComponent
  ]
})
export class UiDayModule {}
