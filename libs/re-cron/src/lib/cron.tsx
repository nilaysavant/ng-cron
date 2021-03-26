import React from 'react';
import { CronType } from '@sbzen/cron-core';

import { CronProps } from './cron-props.type';
import { ReQuartzCron } from './quartz';
import { ReUnixCron } from './unix';

export type ReCronProps = {
	cronType?: CronType
} & CronProps;

export class ReCron extends React.Component<ReCronProps> {
	render() {
		if (this.isQuartzType()) {
			return (
				<ReQuartzCron
					value={this.props.value}
					onChange={str => this.applyChanges(str)}
					disabled={this.props.disabled}
					tabs={this.props.tabs}
					activeTab={this.props.activeTab}
					hideTabs={this.props.hideTabs}
					localization={this.props.localization}>
				</ReQuartzCron>
			);
		}
		return (
			<ReUnixCron
				value={this.props.value}
				onChange={(str) => this.applyChanges(str)}
				disabled={this.props.disabled}
				tabs={this.props.tabs}
				activeTab={this.props.activeTab}
				hideTabs={this.props.hideTabs}
				localization={this.props.localization}>
			</ReUnixCron>
		);
	}

	private applyChanges(str: string) {
		if (this.props.onChange) {
			this.props.onChange(str);
		}
	}

	private isQuartzType() {
		const cronType = this.props.cronType || CronType.QUARTZ;
		return cronType === CronType.QUARTZ;
	}
}

export default ReCron;