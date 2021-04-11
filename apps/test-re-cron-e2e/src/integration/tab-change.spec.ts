import { testTabChange } from '@sbzen/e2e-shared';

describe('Tab change', () => {
	testTabChange('ReCron');
	testTabChange('ReUnixCron');
	testTabChange('ReQuartzCron');
});

