import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Segment, CoreService } from '@sbzen/cron-core';

import { QuartzCronService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
	selector: 'quartz-cron-hour',
	templateUrl: './hour.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourComponent extends TabSingleSegmentComponent {
	hourCodes = this.coreService.getList(Segment.hours, true);
	hours = this.coreService.getList(Segment.hours);

	constructor(
		private coreService: CoreService,
		cd: ChangeDetectorRef,
		quartzCron: QuartzCronService
	) {
		super(Segment.hours, quartzCron, cd);
	}
}
