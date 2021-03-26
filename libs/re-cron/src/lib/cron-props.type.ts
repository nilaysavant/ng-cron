import { Type } from '@sbzen/cron-core';
import { CronHostProps } from './cron-host.abstract';

export type CronProps = {
	disabled?: boolean,
	tabs?: Type[],
	activeTab?: Type
} & CronHostProps;
