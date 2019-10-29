import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
  selector: 'ui-cron-second',
  templateUrl: './second.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSecondComponent extends UiTabSingleSegmentComponent {
  secondCodes = this.coreService.getList(Segment.seconds, true);
  seconds = this.coreService.getList(Segment.seconds);

  constructor(
    private coreService: CoreService,
    uiCronService: UiCronService
  ) {
    super(Segment.seconds, uiCronService);
  }
}
