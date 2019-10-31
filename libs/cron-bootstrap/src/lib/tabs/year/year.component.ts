import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/core';

import { CronBootstrapService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'cron-year',
  templateUrl: './year.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent extends TabSingleSegmentComponent {
  yearCodes = this.coreService.getList(Segment.year, true);
  years = this.coreService.getList(Segment.year);

  constructor(
    private coreService: CoreService,
    cronBootstrap: CronBootstrapService
  ) {
    super(Segment.year, cronBootstrap);
  }
}
