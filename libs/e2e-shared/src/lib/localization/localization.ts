import { Type, CronType } from '@sbzen/cron-core';

import { getHelper } from './helpers';
import { dayTabLocalization } from './day';
import { simpleTabLocalization } from './simple';

export const testLocalization = (type: string) => {
	const { findInContainer, checkLocalizationField, getCronType } = getHelper(type);

	describe(type, () => {
		beforeEach(() => {
			cy.visit('/');
			findInContainer('[data-cron-action="localization-reset"]').click();
			findInContainer('[data-cron-action="localization-use"]').click();
		});

		describe('tabs should be localizable', () => {
			testTabs();
			simpleTabLocalization(type, Type.MINUTES);
			simpleTabLocalization(type, Type.HOURS);
			simpleTabLocalization(type, Type.MONTH);
			dayTabLocalization(type);

			if (getCronType() === CronType.QUARTZ) {
				simpleTabLocalization(type, Type.SECONDS);
				simpleTabLocalization(type, Type.YEAR);
			}
		});

		function testTabs() {
			it('tab buttons should be localizable', () => {
				let tabs = [Type.SECONDS, Type.MINUTES, Type.HOURS, Type.MONTH, Type.DAY, Type.YEAR];
				if (getCronType() === CronType.UNIX) {
					tabs = [Type.MINUTES, Type.HOURS, Type.MONTH, Type.DAY];
				}
				tabs.forEach(tab => {
					checkLocalizationField(
						`[data-cron-action-value="tabs.${tab.toLowerCase()}"]`,
						`.c-tabs .c-tab.${tab}`
					);
				});
			});
		}
	});
};