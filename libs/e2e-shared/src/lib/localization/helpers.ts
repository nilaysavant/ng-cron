import { Type } from '@sbzen/cron-core';

import { getSharedHelper } from './../helpers';

const tab2Localization = new Map([
	[Type.SECONDS, 'second'],
	[Type.MINUTES, 'minute'],
	[Type.HOURS, 'hour'],
	[Type.MONTH, 'month'],
	[Type.YEAR, 'year'],
	[Type.DAY, 'day']
]);

function getCronTypeLocalizationProp(type: string) {
	return type === 'ReUnixCron' ? 'unix' : 'quartz';
}

export const getHelper = (type: string) => {
	const { findInContainer, getCronType } = getSharedHelper(type);
	return {
		getCronType,
		activateTab: (tab: Type) => findInContainer('.c-tabs').find(`.c-tab.${tab}`).click(),
		findInContainer,
		buildFieldSelector: (tab: Type, postfix: string) => `[data-cron-action-value="${getCronTypeLocalizationProp(type)}.${tab2Localization.get(tab)}.${postfix}"]`,
		checkLocalizationField: (fieldSelector: string, textSelector: string) => {
			const text = Math.random().toString();
			findInContainer(`[data-cron-action="localization-field"]${fieldSelector}`).clear().type(text, {
				delay: 0
			}).focus().blur();
			const label = findInContainer(textSelector);
			label.should(elem => expect(elem.text().trim()).to.equal(text));
		}
	}
};