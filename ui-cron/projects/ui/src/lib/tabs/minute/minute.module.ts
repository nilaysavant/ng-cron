import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiMinuteComponent } from './minute.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiMinuteComponent
  ],
  exports: [
    UiMinuteComponent
  ]
})
export class UiMinuteModule {}
