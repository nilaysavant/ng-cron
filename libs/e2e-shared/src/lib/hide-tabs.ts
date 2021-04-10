import { getSharedHelper } from './helpers';

export const testHideTabs = (type: string) => {
	const { findInContainer } = getSharedHelper(type);

	describe(type, () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('tabs should be visible by default', () => {
			getTabs().should('be.visible');
		});
	
		it('tabs should be hidden', () => {
			hideTabs();
			getTabs().should('not.be.visible');
		});

		it('tabs should be visible', () => {
			hideTabs();
			showTabs();
			getTabs().should('be.visible');
		});

		function hideTabs() {
			findInContainer('[data-cron-action="hide-tabs"]').click();
		}

		function showTabs() {
			findInContainer('[data-cron-action="show-tabs"]').click();
		}

		function getTabs() {
			return findInContainer('.c-tabs');
		}
	});
};