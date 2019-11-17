import React from 'react';

import './cron.scss';

import { Type } from '@sbzen/cron-core';

import { ReCronSecond } from './tabs/second/second';
import { ReCronMinute } from './tabs/minute/minute';
import { ReCronHour } from './tabs/hour/hour';
import { ReCronMonth } from './tabs/month/month';
import { ReCronYear } from './tabs/year/year';
import { ReCronDay } from './tabs/day/day';
import { tabs, Tab } from './tabs/tabs';
import { QuartzCronDI } from './cron-di';

export type ReCronProps = {
	cssClassPrefix?: string;
	disabled?: boolean,
	value?: string,
	onChange?: (cronValue: string) => void
}

export type ReCronState = {
	tab: Tab,
	session: number
};

export class ReCron extends React.Component<ReCronProps, ReCronState> {
	constructor(props: ReCronProps) {
		super(props);

		this.state = {
			tab: tabs[0],
			session: Date.now()
		};
	}

	render() {
		QuartzCronDI.get(this.state.session).fillFromExpression(this.props.value);

		console.log('RENDER');
		return (
			<div className="c-host">
				{this.genTabs()}

				<div
					className="c-tab-content"
					role="tabpanel"
					tabIndex={0}
					tab-name={this.state.tab.type}>
					{this.genContent()}
				</div>
			</div>
		);
	}

	private genContent() {
		const second = (
			<ReCronSecond
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronSecond>
		);
		const minute = (
			<ReCronMinute
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronMinute>
		);
		const hour = (
			<ReCronHour
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronHour>
		);
		const month = (
			<ReCronMonth
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronMonth>
		);
		const year = (
			<ReCronYear
				session={this.state.session}
				cssClassPrefix={this.getCssClassPrefix()}
				disabled={this.props.disabled}
				onChange={() => this.applyChanges()}>
			</ReCronYear>
		);
		const day = (
			<ReCronDay
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
		return map.get(this.state.tab.type);
	}

	private genTabs() {
		const className = this.genClassName(['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
		return (
			<ul
				className={className}
				role="tablist"
				aria-label="Cron Generator Tabs">

				{tabs.map(t => this.genTab(t))}
			</ul>
		);
	}

	private genTab(item: Tab) {
		const isActive = this.state.tab === item;
		const className = this.genClassName(['nav-link'], [this.state.tab.type, 'c-tab', isActive ? 'active': '']);
		return (
			<button
				key={item.type}
				role="tab"
				type="button"
				className={className}
				aria-selected={isActive}
				tabIndex={isActive ? 0 : -1}
				onClick={() => this.changeTab(item)}>

				{item.label}
			</button>
		);
	}

	private applyChanges() {
		const str = QuartzCronDI.get(this.state.session).toString();
		if (this.props.onChange) {
			this.props.onChange(str);
		}
	}

	private changeTab(item: Tab) {
		this.setState({
			tab: item
		});
	}

	private getCssClassPrefix() {
		return this.props.cssClassPrefix || '';
	}

	private genClassName(classes: string[], noPrefixClasses: string[] = []) {
		const prefixed = classes.map(c => this.getCssClassPrefix() + c);
		return prefixed.concat(noPrefixClasses).join(' ');
	}
}

export default ReCron;