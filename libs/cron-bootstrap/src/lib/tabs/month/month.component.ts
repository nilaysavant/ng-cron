import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/core';

import { CronBootstrapService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'cron-month',
  templateUrl: './month.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthComponent extends TabSingleSegmentComponent {
  monthCodes = this.coreService.getMonthCodes();
  monthes = this.coreService.getList(Segment.month);

  constructor(
    private coreService: CoreService,
    cronBootstrap: CronBootstrapService
  ) {
    super(Segment.month, cronBootstrap);
  }
}
