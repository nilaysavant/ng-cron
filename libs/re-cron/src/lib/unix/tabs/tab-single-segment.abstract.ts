import { CronUnixUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../cron-tab-single-segment.abstract';
import { UnixCronDI } from './../unix-di';

export abstract class UnixTabSingleSegmentComponent extends CronTabSingleSegmentComponent<CronUnixUIService> {
	protected getQuartzCron() {
		return UnixCronDI.get(this.props.session);
	}
}
