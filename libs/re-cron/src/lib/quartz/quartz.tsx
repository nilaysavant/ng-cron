import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronHostComponent, CronHostProps } from './../cron-host.abstract';
import { QuartzCronSecond, QuartzCronMinute, QuartzCronHour, QuartzCronMonth, QuartzCronYear, QuartzCronDay } from './tabs';
import { QuartzCronDI } from './quartz-di';

import './../cron.scss';

export type ReQuartzCronProps = CronHostProps;
export class ReQuartzCron extends CronHostComponent {
	componentWillUnmount() {
		QuartzCronDI.destroy(this.session);
	}

	render() {
		return this.renderHost(this.state.tab, 'c-quartz');
	}

	protected getTabs() {
		return this.props.tabs || [
			Type.SECONDS,
			Type.MINUTES,
			Type.HOURS,
			Type.DAY,
			Type.MONTH,
			Type.YEAR
		];
	}

	protected genContent() {
		const cronLocalization = this.getLocalization();
		const second = (
			<QuartzCronSecond
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronSecond>
		);
		const minute = (
			<QuartzCronMinute
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronMinute>
		);
		const hour = (
			<QuartzCronHour
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronHour>
		);
		const month = (
			<QuartzCronMonth
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronMonth>
		);
		const year = (
			<QuartzCronYear
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronYear>
		);
		const day = (
			<QuartzCronDay
				localization={cronLocalization}
				session={this.session}
				cssClassPrefix={this.props.cssClassPrefix}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</QuartzCronDay>
		);
		const map = new Map<Type, JSX.Element>([
			[Type.SECONDS, second],
			[Type.MINUTES, minute],
			[Type.HOURS, hour],
			[Type.MONTH, month],
			[Type.YEAR, year],
			[Type.DAY, day]
		]);
		return map.get(this.state.tab) || null;
	}

	protected getQuartzCron() {
		return QuartzCronDI.get(this.session);
	}
}

export default ReQuartzCron;