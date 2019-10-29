import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'ui-cron-month',
  templateUrl: './month.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiMonthComponent extends UiTabSingleSegmentComponent {
  monthCodes = this.coreService.getMonthCodes();
  monthes = this.coreService.getList(Segment.month);

  constructor(
    private coreService: CoreService,
    uiCronService: UiCronService
  ) {
    super(Segment.month, uiCronService);
  }
}
