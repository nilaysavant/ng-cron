import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Segment, Type, CoreService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../../cron-tab-single-segment.abstract';

@Component({
	selector: 'quartz-cron-second',
	templateUrl: './second.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuartzCronSecondComponent extends CronTabSingleSegmentComponent {
	readonly secondCodes = CoreService.getList(Segment.seconds, true);
	readonly seconds = CoreService.getList(Segment.seconds);
	readonly api = this.cronUI.getApi<Type.SECONDS>(Type.SECONDS);

	constructor(
		readonly cronUI: CronQuartzUIService,
		protected readonly cd: ChangeDetectorRef
	) {
		super(Type.SECONDS);
	}
}
