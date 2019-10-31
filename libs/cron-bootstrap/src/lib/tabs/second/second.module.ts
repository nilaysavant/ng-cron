import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondComponent } from './second.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SecondComponent
  ],
  exports: [
    SecondComponent
  ]
})
export class SecondModule {}
