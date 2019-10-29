import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'ui-cron-hour',
  templateUrl: './hour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiHourComponent extends UiTabSingleSegmentComponent {
  hourCodes = this.coreService.getList(Segment.hours, true);
  hours = this.coreService.getList(Segment.hours);

  constructor(
    private coreService: CoreService,
    uiCronService: UiCronService
  ) {
    super(Segment.hours, uiCronService);
  }
}
