import { Type, CronType } from '@sbzen/cron-core';

import { getSharedHelper } from './helpers';

export const testTabs = (type: string) => {
	const { findInContainer, getCronType } = getSharedHelper(type);
	const tabs = getCronType() === CronType.QUARTZ ? [
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

	describe(`Tab change should work with ${type}`, () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('hide all tabs', () => {
			findInContainer('[data-cron-action="hide-tab"]').click();
			findInContainer(`.c-tab`).should('have.length', 0);
		})

		it(`tab should work`, () => {
			for(let i = 0; i < tabs.length; i++) {
				findInContainer('[data-cron-action="hide-tab"]').click();

				const tabsToAdd = tabs.slice(0, i);
				tabsToAdd.forEach(tab => {
					findInContainer(`[data-cron-action="toggle-tab"][data-cron-action-value="${tab}"]`).click();
				});
				tabsToAdd.forEach(tab => {
					findInContainer(`.c-tab.${tab}`).should('have.length', 1);
				});
				tabs.slice(i).forEach(tab => {
					findInContainer(`.c-tab.${tab}`).should('have.length', 0);
				});
			}
		});
	});
};