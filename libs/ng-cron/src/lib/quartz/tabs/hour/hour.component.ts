import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../../cron-tab-single-segment.abstract';

@Component({
	selector: 'quartz-cron-hour',
	templateUrl: './hour.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuartzCronHourComponent extends CronTabSingleSegmentComponent {
	readonly hourCodes = CoreService.getList(Segment.hours, true);
	readonly hours = CoreService.getList(Segment.hours);
	readonly api = this.cronUI.getApi<Type.HOURS>(Type.HOURS);

	constructor(
		readonly cronUI: CronQuartzUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super(Type.HOURS);
	}
}
