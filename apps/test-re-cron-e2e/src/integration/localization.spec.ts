import { testLocalization } from './shared/localization';

describe('Localization', () => {
	beforeEach(() => cy.visit('/'));

	// testLocalization('ReCron');
	testLocalization('ReUnixCron');

	// it('should display welcome message', () => {
	// });
});

