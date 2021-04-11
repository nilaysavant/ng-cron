import { Component, EventEmitter, Output, Input, ContentChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Tab, CronLocalization } from '@sbzen/ng-cron';

import { getLocalizationPathes, getLocalization } from './localization';

@Component({
	selector: 'container',
	templateUrl: './container.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
	@ContentChild('content') content: TemplateRef<HTMLDivElement>;
	@Output() ticked = new EventEmitter<void>();
	@Input() type = '';
	@Input() value = '';
	@Input() initialTabs = [Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR];

	disabled = false;
	hideTabs = false;
	cssClassPrefix = '';
	activeTab: Tab|undefined = undefined;
	tabs: Tab[]|undefined = undefined;
	localization: CronLocalization|undefined = undefined;

	constructor(private readonly cd: ChangeDetectorRef) {}

	updateValue = (v: string) => this.setValue(v);
	updateActiveTab = (v: Tab) => this.setActiveTab(v);

	setValue(v: string) {
		this.value = v;
		
		this.cd.detectChanges();
		this.ticked.emit();
	}

	setDisabled(v?: boolean) {
		this.disabled = v;
		
		this.ticked.emit();
		this.cd.detectChanges();
	}

	setHideTabs(v?: boolean) {
		this.hideTabs = v;
		
		this.cd.detectChanges();
	}

	setCssClassPrefix(v?: string) {
		this.cssClassPrefix = v;
		
		this.cd.detectChanges();
	}

	setActiveTab(v?: Tab) {
		this.activeTab = v;
		
		this.cd.detectChanges();
	}

	setLocalization(v?: CronLocalization) {
		this.localization = v;
		
		this.cd.detectChanges();
	}

	setTabs(v?: Tab[]) {
		this.tabs = v;
		
		this.cd.detectChanges();
	}
	
	getLocalization() {
		return getLocalization();
	}

	getLocalizationPathes() {
		return getLocalizationPathes();
	}

	getLocalizationValue(path: string, loc = getLocalization()) {
		const paths = path.split('.');
		const lastProp = paths[paths.length - 1];
		const store = paths.slice(0, paths.length - 1).reduce((acc, prop) => acc[prop], loc);
		return store[lastProp];
	}

	updateLocalizationField(path: string, localizationValue: string) {
		const paths = path.split('.');
		const lastProp = paths[paths.length - 1];
		const store = paths.slice(0, paths.length - 1).reduce((acc, prop) => acc[prop], this.localization);
		store[lastProp] = localizationValue;
		this.setLocalization({ ...this.localization });
	}

	addedTab(tab: Tab) {
		return (this.tabs || []).includes(tab);
	}

	toggleTab(tab: Tab) {
		const tabsToUse = this.tabs || [];
		if (this.addedTab(tab)) {
			this.setTabs(tabsToUse.filter(t => t !== tab));
			return;
		}
		this.setTabs([
			...tabsToUse,
			tab
		]);
	}
}
