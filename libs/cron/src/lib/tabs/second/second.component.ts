import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/cron-core';

import { QuartzCronService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
	selector: 'quartz-cron-second',
	templateUrl: './second.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondComponent extends TabSingleSegmentComponent {
	secondCodes = this.coreService.getList(Segment.seconds, true);
	seconds = this.coreService.getList(Segment.seconds);

	constructor(
		private coreService: CoreService,
		quartzCron: QuartzCronService
	) {
		super(Segment.seconds, quartzCron);
	}
}
