import { CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../cron-tab-single-segment.abstract';
import { QuartzCronDI } from './../quartz-di';

export abstract class QuartzTabSingleSegmentComponent extends CronTabSingleSegmentComponent<CronQuartzUIService> {
	protected getQuartzCron() {
		return QuartzCronDI.get(this.props.session);
	}
}
