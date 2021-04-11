import { Component, ChangeDetectorRef } from '@angular/core';

import { Tab } from '@sbzen/ng-cron';
import {
	tabsManagingHtmlExample,
	tabsManagingTsExample,
	hideTabsHtmlExample,
	hideTabsTsExample
} from './constants';

@Component({
	templateUrl: './visibility-inputs.html',
	styleUrls: ['./visibility-inputs.scss']
})
export class DocCustomizationVisibilityInputsComponent {
	tabsManagingHtmlExample = tabsManagingHtmlExample;
	tabsManagingTsExample = tabsManagingTsExample;
	hideTabsHtmlExample = hideTabsHtmlExample;
	hideTabsTsExample = hideTabsTsExample;
	allTabs = [Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR];
	tabs = [Tab.SECONDS, Tab.HOURS];
	tabsCronValue = '2,0,4,3,1 0/1 3/2 ? * 4/5 *';
	hideTabs = false;

	constructor(private readonly cd: ChangeDetectorRef) {}

	toggleTab(tab: Tab) {
		console.log(tab, this.tabs);
		if (this.isVisibleTab(tab)) {
			this.tabs = this.tabs.filter(t => t !== tab);
			this.cd.detectChanges();
			return;
		}
		this.tabs = [
			...this.tabs,
			tab
		];
		this.cd.detectChanges();
	}

	isVisibleTab(tab: Tab) {
		return this.tabs.includes(tab);
	}
}
