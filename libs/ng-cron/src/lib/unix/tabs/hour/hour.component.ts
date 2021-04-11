import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronUnixUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../../cron-tab-single-segment.abstract';

@Component({
	selector: 'unix-cron-hour',
	templateUrl: './hour.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnixCronHourComponent extends CronTabSingleSegmentComponent {
	readonly hourCodes = CoreService.getList(Segment.hours, true);
	readonly hours = CoreService.getList(Segment.hours);
	readonly api = this.cronUI.getApi<Type.HOURS>(Type.HOURS);

	constructor(
		readonly cronUI: CronUnixUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super(Type.HOURS);
	}
}
