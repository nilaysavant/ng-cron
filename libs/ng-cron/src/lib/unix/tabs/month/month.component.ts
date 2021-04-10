import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronUnixUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../../cron-tab-single-segment.abstract';

@Component({
	selector: 'unix-cron-month',
	templateUrl: './month.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnixCronMonthComponent extends CronTabSingleSegmentComponent {
	readonly monthCodes = CoreService.getMonthCodes();
	readonly monthes = CoreService.getList(Segment.month);
	readonly incrementPrimaryOptions = this.monthes.map((v, i) => ({
		...v,
		label: i + 1
	}));
	readonly api = this.cronUI.getApi<Type.MONTH>(Type.MONTH);

	constructor(
		readonly cronUI: CronUnixUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super(Type.MONTH);
	}
}
