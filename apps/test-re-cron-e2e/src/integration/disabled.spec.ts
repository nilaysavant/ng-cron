import { testDisabled } from '@sbzen/e2e-shared';

describe('Disabled', () => {
	testDisabled('ReCron');
	testDisabled('ReUnixCron');
	testDisabled('ReQuartzCron');
});

