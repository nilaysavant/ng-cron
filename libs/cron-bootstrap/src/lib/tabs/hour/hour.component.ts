import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/core';

import { CronBootstrapService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'cron-hour',
  templateUrl: './hour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourComponent extends TabSingleSegmentComponent {
  hourCodes = this.coreService.getList(Segment.hours, true);
  hours = this.coreService.getList(Segment.hours);

  constructor(
    private coreService: CoreService,
    cronBootstrap: CronBootstrapService
  ) {
    super(Segment.hours, cronBootstrap);
  }
}
