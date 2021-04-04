import { CronType } from '@sbzen/cron-core';
import { getSharedHelper } from './helpers';

export const testCronType = (type: string) => {
	const { findInContainer } = getSharedHelper(type);

	describe(`Should be able to change cron type`, () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it(`by default should be ${CronType.QUARTZ} cron type`, () => {
			findInContainer('.c-host.c-quartz').should('have.length', 1);
			findInContainer('.c-host.c-unix').should('have.length', 0);
		})

		it(`set ${CronType.UNIX} cron type`, () => {
			findInContainer('[data-cron-action="use-unix"]').click();
			findInContainer('.c-host.c-unix').should('have.length', 1);
			findInContainer('.c-host.c-quartz').should('have.length', 0);
		})
	
		it(`set back to ${CronType.QUARTZ} cron type`, () => {
			findInContainer('[data-cron-action="use-unix"]').click();
			findInContainer('[data-cron-action="use-quartz"]').click();
			findInContainer('.c-host.c-quartz').should('have.length', 1);
			findInContainer('.c-host.c-unix').should('have.length', 0);
		})
	});
};