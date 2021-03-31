import { Segment, CronUnixUIService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronBaseComponent, CronBaseProps } from './cron-base.abstract';
import { localization } from './cron-localization';

export type CronTabBaseProps = {
	disabled: boolean,
	onChange: () => void,
	localization: typeof localization,
	session: string
} & CronBaseProps;

export abstract class CronTabBaseComponent<P extends CronTabBaseProps, T extends CronUnixUIService|CronQuartzUIService> extends CronBaseComponent<P, { tick: number }> {
	private unListener: () => void;

	constructor(props, segments: Segment[]) {
		super(props);

		this.unListener = this.getQuartzCron().listen(segments, () => {
			this.setState({
				tick: Math.random()
			});
			this.props.onChange();
		});
	}

	componentWillUnmount() {
		this.unListener();
	}

	protected abstract getQuartzCron(): T;
}
