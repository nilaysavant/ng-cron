import { testLocalization } from '@sbzen/e2e-shared';

describe('Localization', () => {
	beforeEach(() => cy.visit('/'));

	testLocalization('ReUnixCron');
	testLocalization('ReQuartzCron');
});

