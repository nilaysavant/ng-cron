import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinuteComponent } from './minute.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MinuteComponent
  ],
  exports: [
    MinuteComponent
  ]
})
export class MinuteModule {}
