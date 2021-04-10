import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronUnixUIService } from '@sbzen/cron-core';

import { CronTabComponent } from './../../../cron-tab.abstract';

@Component({
	selector: 'unix-cron-day',
	templateUrl: './day.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnixCronDayComponent extends CronTabComponent {
	protected readonly segments: Segment[];

	readonly api = this.cronUI.getApi<Type.DAY>(Type.DAY);
	readonly segment = Segment;

	readonly daysOfWeekEvery = CoreService.getList(Segment.dayOfWeek, true);
	readonly daysOfWeek = CoreService.getList(Segment.dayOfWeek);
	readonly daysOfWeekCodes = CoreService.getDaysOfWeekCodes();

	readonly daysOfMonthEvery = CoreService.getList(Segment.dayOfMonth, true);
	readonly daysOfMonth = CoreService.getList(Segment.dayOfMonth);

	constructor(
		readonly cronUI: CronUnixUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super();
		this.segments = [Segment.dayOfMonth, Segment.dayOfWeek];
	}
}
