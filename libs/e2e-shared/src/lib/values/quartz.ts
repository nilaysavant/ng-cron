import { Type } from '@sbzen/cron-core';

import { getSharedHelper } from './../helpers';

export const testQuartz = (type: string) => {
	const { findInContainer } = getSharedHelper(type);

	beforeEach(() => {
		cy.visit('/');
	});

	const actions = [
		{
			value: '0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1',
			checker: () => {
				findInContainer(`.c-tab.${Type.SECONDS}`).click();
				findInContainer('.c-and-check .c-and-option').should('be.checked');
				findInContainer('.c-and .c-and-item[item-value="0"] .c-and-item-field').should('be.checked');
				findInContainer('.c-and .c-and-item[item-value="1"] .c-and-item-field').should('be.checked');
				findInContainer('.c-and .c-and-item[item-value="2"] .c-and-item-field').should('be.checked');

				findInContainer(`.c-tab.${Type.MINUTES}`).click();
				findInContainer('.c-increment-check .c-increment-option').should('be.checked');
				findInContainer('.c-increment .c-increment-every').should('have.value', '4');
				findInContainer('.c-increment .c-increment-from').should('have.value', '2');
			}
		}
	];

	actions.forEach(({ value, checker }) => {
		it(`check value ${value}`, () => {
			findInContainer('[data-cron="value"]').clear().type(value);
			checker();
		})
	})
}