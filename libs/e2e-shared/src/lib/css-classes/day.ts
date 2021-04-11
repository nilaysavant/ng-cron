import { Type, CronType, QuartzService, Segment } from '@sbzen/cron-core';

import { getSharedHelper } from './../helpers';
import { cssClassesHelpers } from './helpers';
import { getDayClasses } from './day.classes';

export const testDay = (type: string, cssClassPrefix = '') => {
	const { getTabs, getContentByTab, checkClasses } = cssClassesHelpers(type, cssClassPrefix);
	const { getCronType } = getSharedHelper(type);

	describe(`tab ${Type.DAY}`, () => {
		const tabClasses = getDayClasses(type, cssClassPrefix);
		beforeEach(() => getTabs().filter(`.${Type.DAY}`).click());

		it (`tab content ${Type.DAY}`, () => {
			getContentByTab(Type.DAY).should('be.visible');
		});

		it (`tab every weekday segment`, () => {
			const { everyWeekday } = tabClasses;
			checkClasses(Type.DAY, everyWeekday);
		});

		it (`tab increment weekday segment`, () => {
			const { incrementWeekday } = tabClasses;
			checkClasses(Type.DAY, incrementWeekday);
		});

		it (`tab increment monthday segment`, () => {
			const { incrementMonthday } = tabClasses;
			checkClasses(Type.DAY, incrementMonthday);
		});

		it (`tab and weekday segment`, () => {
			const { andWeekday } = tabClasses;

			checkClasses(Type.DAY, {
				box: andWeekday.box,
				switcherBox: andWeekday.switcherBox,
				switcher: andWeekday.switcher,
				label: andWeekday.label,
				itemsBox: andWeekday.itemsBox
			});

			QuartzService.getDaysOfWeekCodes()
				.forEach(({ value }) => {
					const postfix = `[item-value="${value}"]`;
					checkClasses(Type.DAY, {
						itemWrapper: andWeekday.itemWrapper(postfix),
						itemBox: andWeekday.itemBox(postfix),
						itemControl: andWeekday.itemControl(postfix),
						itemLabel: andWeekday.itemLabel(postfix)
					});
				});
		});

		it (`tab and monthday segment`, () => {
			const { andMonthday } = tabClasses;

			checkClasses(Type.DAY, {
				box: andMonthday.box,
				switcherBox: andMonthday.switcherBox,
				switcher: andMonthday.switcher,
				label: andMonthday.label,
				itemsBox: andMonthday.itemsBox
			});

			QuartzService.getList(Segment.month)
				.forEach(({ value }) => {
					const postfix = `[item-value="${value}"]`;
					checkClasses(Type.DAY, {
						itemWrapper: andMonthday.itemWrapper(postfix),
						itemBox: andMonthday.itemBox(postfix),
						itemControl: andMonthday.itemControl(postfix),
						itemLabel: andMonthday.itemLabel(postfix)
					});
				});
		});

		if (getCronType() === CronType.QUARTZ) {
			it (`tab last monthday segment`, () => {
				const { lastMonthday } = tabClasses;
				checkClasses(Type.DAY, lastMonthday);
			});

			it (`tab last weekday segment`, () => {
				const { lastWeekday } = tabClasses;
				checkClasses(Type.DAY, lastWeekday);
			});

			it (`tab last htn segment`, () => {
				const { lastNth } = tabClasses;
				checkClasses(Type.DAY, lastNth);
			});

			it (`tab day before end segment`, () => {
				const { dayBeforeEnd } = tabClasses;
				checkClasses(Type.DAY, dayBeforeEnd);
			});

			it (`tab nearest segment`, () => {
				const { nearest } = tabClasses;
				checkClasses(Type.DAY, nearest);
			});

			it (`tab nth segment`, () => {
				const { nth } = tabClasses;
				checkClasses(Type.DAY, nth);
			});
		}
	});
};