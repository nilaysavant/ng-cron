import { Type } from '@sbzen/cron-core';

export type Tab = {
	label: string,
	type: Type
}

export const tabs: Tab[] = [
	{
		label: 'Seconds',
		type: Type.SECONDS
	},
	{
		label: 'Minutes',
		type: Type.MINUTES
	},
	{
		label: 'Hours',
		type: Type.HOURS
	},
	{
		label: 'Day',
		type: Type.DAY
	},
	{
		label: 'Month',
		type: Type.MONTH
	},
	{
		label: 'Year',
		type: Type.YEAR
	}
];
