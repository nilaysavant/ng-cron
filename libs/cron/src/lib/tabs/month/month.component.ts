import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Segment, CoreService } from '@sbzen/cron-core';

import { QuartzCronService } from './../../cron.service';
import { TabSingleSegmentComponent } from './../tab-single-segment.component';

@Component({
	selector: 'quartz-cron-month',
	templateUrl: './month.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthComponent extends TabSingleSegmentComponent {
	monthCodes = this.coreService.getMonthCodes();
	monthes = this.coreService.getList(Segment.month);

	constructor(
		private coreService: CoreService,
		quartzCron: QuartzCronService
	) {
		super(Segment.month, quartzCron);
	}
}
