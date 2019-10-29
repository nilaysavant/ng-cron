import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiSecondComponent } from './second.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiSecondComponent
  ],
  exports: [
    UiSecondComponent
  ]
})
export class UiSecondModule {}
