import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiHourComponent } from './hour.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiHourComponent
  ],
  exports: [
    UiHourComponent
  ]
})
export class UiHourModule {}
