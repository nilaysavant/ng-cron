import { testTabs } from '@sbzen/e2e-shared';

describe('Tabs', () => {
	testTabs('ReCron');
	testTabs('ReUnixCron');
	testTabs('ReQuartzCron');
});

