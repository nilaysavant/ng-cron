import { testLocalization } from '@sbzen/e2e-shared';

describe('Localization', () => {
	beforeEach(() => cy.visit('/'));

	testLocalization('ReCron');
	testLocalization('ReUnixCron');
	testLocalization('ReQuartzCron');
});

