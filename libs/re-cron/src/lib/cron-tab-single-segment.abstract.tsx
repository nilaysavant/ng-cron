import React from 'react';
import { CronUnixUIService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabBaseComponent, CronTabBaseProps } from './cron-tab-base.abstract';

export abstract class CronTabSingleSegmentComponent<T extends CronUnixUIService|CronQuartzUIService> extends CronTabBaseComponent<CronTabBaseProps, T> {
	protected abstract genEvery(): JSX.Element;
	protected abstract genIncrement(): JSX.Element;
	protected abstract genAnd(): JSX.Element;
	protected abstract genRange(): JSX.Element;

	render() {
		return (
			<div>
				{this.genEvery()}
				{this.genIncrement()}
				{this.genAnd()}
				{this.genRange()}
			</div>
		);
	}
}
