import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'ui-cron-year',
  templateUrl: './year.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiYearComponent extends UiTabSingleSegmentComponent {
  yearCodes = this.coreService.getList(Segment.year, true);
  years = this.coreService.getList(Segment.year);

  constructor(
    private coreService: CoreService,
    uiCronService: UiCronService
  ) {
    super(Segment.year, uiCronService);
  }
}
