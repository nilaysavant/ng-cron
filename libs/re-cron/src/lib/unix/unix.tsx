import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronHostComponent } from './../cron-host.abstract';
import { CronProps } from './../cron-props.type';
import { CronState } from './../cron-state.type';
import { ReCronMinute, ReCronHour, ReCronMonth, ReCronDay } from './tabs';
import { UnixCronDI } from './unix-di';
import { tabs } from './tabs/tabs';

import './../cron.scss';

export type ReUnixCronProps = CronProps;
export class ReUnixCron extends CronHostComponent<ReUnixCronProps, CronState> {
	constructor(props: ReUnixCronProps) {
		super(props, Date.now());
		const [activeTab] = this.props.activeTab ? [this.props.activeTab] : this.getTabs();

		this.state = {
			tab: activeTab,
			session: this.session
		};
	}

	componentWillUnmount() {
		UnixCronDI.destroy(this.session);
	}

	render() {
		return this.renderHost(this.state.tab, 'c-unix')
	}

	protected getTabs() {
		const cronTabs = this.props.tabs || tabs;
		return cronTabs.filter(t => ![
			Type.SECONDS,
			Type.YEAR
		].includes(t));
	}

	protected genContent() {
		const cronLocalization = this.getLocalization();
		const minute = (
			<ReCronMinute
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronMinute>
		);
		const hour = (
			<ReCronHour
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronHour>
		);
		const month = (
			<ReCronMonth
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronMonth>
		);
		const day = (
			<ReCronDay
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronDay>
		);
		const map = new Map<Type, JSX.Element>([
			[Type.MINUTES, minute],
			[Type.HOURS, hour],
			[Type.MONTH, month],
			[Type.DAY, day]
		]);
		return map.get(this.state.tab);
	}

	protected changeTab(tab: Type) {
		this.setState({ tab });
	}

	protected getQuartzCron() {
		return UnixCronDI.get(this.session);
	}
}

export default ReUnixCron;