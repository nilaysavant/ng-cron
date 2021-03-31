import { Type } from '@sbzen/cron-core';
import { CronHostProps } from './cron-host.abstract';

export type CronProps = {
	tabs?: Type[]
} & CronHostProps;
