import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Segment, CoreService } from '@sbzen/cron-core';

import { QuartzCronService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
	selector: 'quartz-cron-minute',
	templateUrl: './minute.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinuteComponent extends TabSingleSegmentComponent {
	minuteCodes = this.coreService.getList(Segment.minutes, true);
	minutes = this.coreService.getList(Segment.minutes);

	constructor(
		private coreService: CoreService,
		cd: ChangeDetectorRef,
		quartzCron: QuartzCronService
	) {
		super(Segment.minutes, quartzCron, cd);
	}
}
