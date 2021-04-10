import { testCssClasses } from '@sbzen/e2e-shared';

describe('CSS Classes', () => {
	testCssClasses('ReCron');
	testCssClasses('ReUnixCron');
	testCssClasses('ReQuartzCron');
});

