import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronBaseComponent, CronBaseProps } from './cron-base.abstract';
import { localization, CronLocalization } from './cron-localization';
import { CronService } from './cron.service';

type RawObject = {
	[key: string]: string|RawObject;
};

export type CronHostProps = {
	localization?: CronLocalization,
	hideTabs?: boolean,
	value?: string,
	onChange?: (cronValue: string) => void
} & CronBaseProps;

export abstract class CronHostComponent<P extends CronHostProps, S> extends CronBaseComponent<P, S> {
	constructor(
		props: P,
		session: number
	) {
		super(props, session);
	}

	protected abstract getTabs(): Type[];
	protected abstract changeTab(tab: Type): void;
	protected abstract genContent(): JSX.Element;
	protected abstract getQuartzCron(): CronService;

	protected applyChanges() {
		const str = this.getQuartzCron().toString();
		if (this.props.onChange) {
			this.props.onChange(str);
		}
	}

	protected renderHost(activeTab: Type, addClass: string) {
		const servce = this.getQuartzCron();
		servce.fillFromExpression(this.props.value);

		return (
			<div className={`c-host ${addClass}`}>
				{!this.props.hideTabs && this.genTabs(activeTab)}

				<div
					className="c-tab-content"
					role="tabpanel"
					tabIndex={0}
					tab-name={activeTab}>
					{this.genContent()}
				</div>
			</div>
		);
	}

	protected getLocalization() {
		return this.mergeDeep<typeof localization>(localization, this.props.localization || {});
	}

	private genTabs(activeTab: Type) {
		const className = this.genClassName(['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
		return (
			<ul
				className={className}
				role="tablist"
				aria-label="Cron Generator Tabs">

				{this.getTabs().map(t => this.genTab(t, activeTab))}
			</ul>
		);
	}

	private genTab(tab: Type, activeTab: Type) {
		const { tabs: tabsLocalization } = this.getLocalization();
		const isActive = activeTab === tab;
		const className = this.genClassName(['nav-link'], [activeTab, 'c-tab', isActive ? 'active': '']);
		return (
			<button
				key={tab}
				role="tab"
				type="button"
				className={className}
				aria-selected={isActive}
				tabIndex={isActive ? 0 : -1}
				onClick={() => this.changeTab(tab)}>

				{tabsLocalization[tab.toLowerCase()]}
			</button>
		);
	}

	private mergeDeep<T extends RawObject>(...objects: RawObject[]) {
		return objects.reduce((prev, obj) => {
			Object.keys(obj).forEach(key => {
				const pVal = prev[key];
				const oVal = obj[key];
				
				if (pVal && typeof pVal === 'object' && oVal && typeof oVal === 'object') {
					prev[key] = this.mergeDeep(pVal, oVal);
				} else {
					prev[key] = oVal;
				}
			});
			
			return prev;
		}, {}) as T;
	}
}