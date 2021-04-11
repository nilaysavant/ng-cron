import { testActiveTab } from '@sbzen/e2e-shared';

describe('Active Tab', () => {
	testActiveTab('ReCron');
	testActiveTab('ReUnixCron');
	testActiveTab('ReQuartzCron');
});

