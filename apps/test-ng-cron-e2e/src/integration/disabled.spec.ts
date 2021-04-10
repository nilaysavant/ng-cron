import { testDisabled } from '@sbzen/e2e-shared';

describe('Disabled', () => {
	testDisabled('ReUnixCron');
	testDisabled('ReQuartzCron');
});

