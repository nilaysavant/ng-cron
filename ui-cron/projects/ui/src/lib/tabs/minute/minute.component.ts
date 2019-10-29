import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'ui-cron-minute',
  templateUrl: './minute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiMinuteComponent extends UiTabSingleSegmentComponent {
  minuteCodes = this.coreService.getList(Segment.minutes, true);
  minutes = this.coreService.getList(Segment.minutes);

  constructor(
    private coreService: CoreService,
    uiCronService: UiCronService
  ) {
    super(Segment.minutes, uiCronService);
  }
}
