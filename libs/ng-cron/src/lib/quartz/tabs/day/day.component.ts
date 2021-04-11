import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabComponent } from './../../../cron-tab.abstract';

@Component({
	selector: 'quartz-cron-day',
	templateUrl: './day.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuartzCronDayComponent extends CronTabComponent {
	readonly api = this.cronUI.getApi<Type.DAY>(Type.DAY);
	readonly segment = Segment;
	readonly segments = [Segment.dayOfMonth, Segment.dayOfWeek];

	readonly daysOfWeekEvery = CoreService.getList(Segment.dayOfWeek, true);
	readonly daysOfWeek = CoreService.getList(Segment.dayOfWeek);
	readonly daysOfWeekCodes = CoreService.getDaysOfWeekCodes();

	readonly daysOfMonthEvery = CoreService.getList(Segment.dayOfMonth, true);
	readonly daysOfMonth = CoreService.getList(Segment.dayOfMonth);
	readonly limitedDaysOfMonth = this.daysOfMonthEvery.slice(0, 5);

	constructor(
		readonly cronUI: CronQuartzUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super();
	}
}
