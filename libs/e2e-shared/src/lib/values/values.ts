import { CronType } from '@sbzen/cron-core';
import { getSharedHelper } from './../helpers';

import { testQuartz } from './quartz';

export const testValues = (type: string) => {
	const { findInContainer, getCronType } = getSharedHelper(type);

	if (getCronType() === CronType.QUARTZ) {
		testQuartz(type);
	}
};