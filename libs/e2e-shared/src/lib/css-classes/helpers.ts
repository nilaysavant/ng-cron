import { Type, CronType } from '@sbzen/cron-core';

import { getSharedHelper } from './../helpers';

export const getTabsClasses = (cssClassPrefix: string) => ({
	box: `.${cssClassPrefix}nav.${cssClassPrefix}nav-tabs.${cssClassPrefix}mb-2.c-tabs`,
	tab: `.${cssClassPrefix}nav-link.c-tab`
});

export const cssClassesHelpers = (type: string, cssClassPrefix = '') => {
	const { getCronType, findInContainer } = getSharedHelper(type);

	function getHost() {
		return findInContainer(`.c-host.c-${getCronType().toLowerCase()}`);
	}

	function getContentByTab(tab: Type) {
		return getHost().find(`.c-tab-content[tab-name="${tab}"]`);
	}

	function checkClasses(tab: Type, classes: { [key: string]: string }) {
		const values = Object.keys(classes).map(prop => classes[prop]);
		getContentByTab(tab).find(values.join(',')).should('have.length', values.length);
	}

	function getTabs() {
		const { tab } = getTabsClasses(cssClassPrefix);
		return getTabsContainer().find(tab);
	}

	function getTabsContainer() {
		const { box } = getTabsClasses(cssClassPrefix);
		return getHost().find(box);
	}

	return {
		getTabs,
		checkClasses,
		getTabsContainer,
		getContentByTab,
		getTabsList: () => {
			return getCronType() === CronType.QUARTZ ? [
				Type.DAY,
				Type.HOURS,
				Type.MINUTES,
				Type.MONTH,
				Type.SECONDS,
				Type.YEAR
			] : [
				Type.DAY,
				Type.HOURS,
				Type.MINUTES,
				Type.MONTH
			];
		}
	};
}

