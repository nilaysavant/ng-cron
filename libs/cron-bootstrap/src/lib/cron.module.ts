import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinuteModule } from './tabs/minute';
import { MonthModule } from './tabs/month';
import { HourModule } from './tabs/hour';
import { SecondModule } from './tabs/second';
import { YearModule } from './tabs/year';
import { DayModule } from './tabs/day';

import { CronBootstrapComponent } from './cron.component';

@NgModule({
  imports: [
    CommonModule,
    MonthModule,
    MinuteModule,
    HourModule,
    SecondModule,
    YearModule,
    DayModule
  ],
  declarations: [
    CronBootstrapComponent
  ],
  exports: [
    CronBootstrapComponent
  ]
})
export class CronBootstrapModule {}
