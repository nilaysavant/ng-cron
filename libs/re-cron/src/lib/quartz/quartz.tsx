import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronHostComponent } from './../cron-host.abstract';
import { CronProps } from './../cron-props.type';
import { CronState } from './../cron-state.type';
import { ReCronSecond, ReCronMinute, ReCronHour, ReCronMonth, ReCronYear, ReCronDay } from './tabs';
import { QuartzCronDI } from './quartz-di';
import { tabs } from './tabs/tabs';

import './../cron.scss';

export type ReQuartzCronProps = CronProps;
export class ReQuartzCron extends CronHostComponent<ReQuartzCronProps, CronState> {
	constructor(props: ReQuartzCronProps) {
		super(props, Date.now());
		const [activeTab] = this.props.activeTab ? [this.props.activeTab] : this.getTabs();

		this.state = {
			tab: activeTab,
			session: this.session
		};
	}

	componentWillUnmount() {
		QuartzCronDI.destroy(this.session);
	}

	render() {
		return this.renderHost(this.state.tab, 'c-quartz');
	}

	protected changeTab(tab: Type) {
		this.setState({ tab });
	}

	protected getTabs() {
		return this.props.tabs || tabs;
	}

	protected genContent() {
		const cronLocalization = this.getLocalization();
		const second = (
			<ReCronSecond
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronSecond>
		);
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
		const year = (
			<ReCronYear
				localization={cronLocalization}
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronYear>
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
			[Type.SECONDS, second],
			[Type.MINUTES, minute],
			[Type.HOURS, hour],
			[Type.MONTH, month],
			[Type.YEAR, year],
			[Type.DAY, day]
		]);
		return map.get(this.state.tab);
	}

	protected getQuartzCron() {
		return QuartzCronDI.get(this.session);
	}
}

export default ReQuartzCron;