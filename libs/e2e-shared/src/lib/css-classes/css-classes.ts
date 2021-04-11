import { getSharedHelper } from './../helpers';
import { cssClassesHelpers } from './helpers';
import { testDay } from './day'
import { testSimple } from './simple';

export const testCssClasses = (type: string) => {
	const { findInContainer } = getSharedHelper(type);
	describe(type, () => {
		beforeEach(() => {
			cy.visit('/');
		});

		describe('should work without cssClassPrefix', () => {
			const { getTabsContainer, getTabs, getTabsList } = cssClassesHelpers(type);

			it('tabs classes presented', () => {
				getTabsContainer().should('be.visible');
				getTabs().first().should('have.class', 'active');
	
				getTabsList().forEach(tab => {
					getTabs().filter(`.${tab}`).should('be.visible');
				});
			});
	
			testDay(type);
			describe('simple tabs content', () => testSimple(type))
		});

		describe('should work with cssClassPrefix', () => {
			const cssClassPrefix = 'my-';
			const { getTabsContainer, getTabs, getTabsList } = cssClassesHelpers(type, cssClassPrefix);
			
			beforeEach(() => {
				findInContainer('[data-cron-action="add-css-class-prefix"]').click();
			})

			it('tabs classes presented', () => {
				getTabsContainer().should('be.visible');
				getTabs().first().should('have.class', 'active');
	
				getTabsList().forEach(tab => {
					getTabs().filter(`.${tab}`).should('be.visible');
				});
			});
	
			testDay(type, cssClassPrefix);
			describe('simple tabs content', () => testSimple(type, cssClassPrefix))
		});
	});
};