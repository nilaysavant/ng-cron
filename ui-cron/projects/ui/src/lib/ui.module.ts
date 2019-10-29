import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiMinuteModule } from './tabs/minute';
import { UiMonthModule } from './tabs/month';
import { UiHourModule } from './tabs/hour';
import { UiSecondModule } from './tabs/second';
import { UiYearModule } from './tabs/year';
import { UiDayModule } from './tabs/day';

import { UiCronComponent } from './ui.component';

@NgModule({
  imports: [
    CommonModule,
    UiMonthModule,
    UiMinuteModule,
    UiHourModule,
    UiSecondModule,
    UiYearModule,
    UiDayModule
  ],
  declarations: [
    UiCronComponent
  ],
  exports: [
    UiCronComponent
  ]
})
export class UiCronModule {}
