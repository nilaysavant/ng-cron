import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/core';

import { CronBootstrapService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'cron-second',
  templateUrl: './second.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondComponent extends TabSingleSegmentComponent {
  secondCodes = this.coreService.getList(Segment.seconds, true);
  seconds = this.coreService.getList(Segment.seconds);

  constructor(
    private coreService: CoreService,
    cronBootstrap: CronBootstrapService
  ) {
    super(Segment.seconds, cronBootstrap);
  }
}
