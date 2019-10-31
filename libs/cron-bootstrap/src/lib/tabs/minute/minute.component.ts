import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/core';

import { CronBootstrapService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'cron-minute',
  templateUrl: './minute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinuteComponent extends TabSingleSegmentComponent {
  minuteCodes = this.coreService.getList(Segment.minutes, true);
  minutes = this.coreService.getList(Segment.minutes);

  constructor(
    private coreService: CoreService,
    cronBootstrap: CronBootstrapService
  ) {
    super(Segment.minutes, cronBootstrap);
  }
}
