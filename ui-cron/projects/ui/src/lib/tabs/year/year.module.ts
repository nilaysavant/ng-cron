import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiYearComponent } from './year.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiYearComponent
  ],
  exports: [
    UiYearComponent
  ]
})
export class UiYearModule {}
