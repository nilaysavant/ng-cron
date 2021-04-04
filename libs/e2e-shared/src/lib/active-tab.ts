import { Type, CronType } from '@sbzen/cron-core';

import { getSharedHelper } from './helpers';

export const testActiveTab = (type: string) => {
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

	describe(`Active tab should work with ${type}`, () => {
		beforeEach(() => {
			cy.visit('/');
		});

		tabs.forEach(t => {
			it(`state should be disabled ${t}`, () => {
				findInContainer(`[data-cron-action="change-tab"][data-cron-action-value="${t}"]`).click();
				findInContainer(`.c-tab.${t}`).should('have.class', 'active');
				findInContainer(`.c-tab-content[tab-name="${t}"]`).should('have.length', 1);
			});
		});
	});
};