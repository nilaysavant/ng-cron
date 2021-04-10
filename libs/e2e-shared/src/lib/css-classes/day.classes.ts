import { CronType } from '@sbzen/cron-core';
import { getSharedHelper } from './../helpers';

export const getDayClasses = (type: string, cssClassPrefix = '') => {
	const { getCronType } = getSharedHelper(type);

	return {
		everyWeekday: (() => {
			const box = `.${cssClassPrefix}form-group.c-every-weekday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-every-weekday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-every-weekday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-every-weekday-option-label`;

			return {
				box,
				switcherBox,
				switcher,
				label
			}
		})(),

		incrementWeekday: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-increment-weekday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-increment-weekday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-increment-weekday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-increment-weekday-option-label`;
			const label2 = `${box} label.c-increment-weekday-option-label2`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-increment-weekday-every`;
			const control2 = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-increment-weekday-from`;

			const quartz = getCronType() !== CronType.QUARTZ ? {} : {
				control2
			};

			return {
				box,
				switcherBox,
				switcher,
				label,
				label2,
				control,
				...quartz
			}
		})(),

		incrementMonthday: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-increment-monthday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-increment-monthday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-increment-monthday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-increment-monthday-option-label`;
			const label2 = `${box} label.c-increment-monthday-option-label2`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-increment-monthday-every`;
			const control2 = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-increment-monthday-from`;

			const quartz = getCronType() !== CronType.QUARTZ ? {} : {
				control2
			};

			return {
				box,
				switcherBox,
				switcher,
				label,
				label2,
				control,
				...quartz
			}
		})(),

		andWeekday: (() => {
			const box = `.${cssClassPrefix}form-group.c-and-weekday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-and-weekday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-and-weekday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-and-weekday-option-label`;
			const itemsBox = `${box} .${cssClassPrefix}row.${cssClassPrefix}pl-3.${cssClassPrefix}pt-1.c-and-weekday-list`;

			const itemWrapper = (postfix: string) => `${itemsBox} .${cssClassPrefix}col-2.c-and-weekday-item${postfix}`;
			const itemBox = (postfix: string) => `${itemWrapper(postfix)} .${cssClassPrefix}form-check.c-and-weekday-item-check`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				itemsBox,
				itemWrapper,
				itemBox,
				itemControl: (postfix: string) => `${itemBox(postfix)} input.${cssClassPrefix}form-check-input.c-and-weekday-item-field`,
				itemLabel: (postfix: string) => `${itemBox(postfix)} label.${cssClassPrefix}form-check-label.c-and-weekday-item-label`,
			}
		})(),

		andMonthday: (() => {
			const box = `.${cssClassPrefix}form-group.c-and-monthday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-and-monthday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-and-monthday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-and-monthday-option-label`;
			const itemsBox = `${box} .${cssClassPrefix}row.${cssClassPrefix}pl-3.${cssClassPrefix}pt-1.c-and-monthday-list`;

			const itemWrapper = (postfix: string) => `${itemsBox} .${cssClassPrefix}col-1.c-and-monthday-item${postfix}`;
			const itemBox = (postfix: string) => `${itemWrapper(postfix)} .${cssClassPrefix}form-check.c-and-monthday-item-check`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				itemsBox,
				itemWrapper,
				itemBox,
				itemControl: (postfix: string) => `${itemBox(postfix)} input.${cssClassPrefix}form-check-input.c-and-monthday-item-field`,
				itemLabel: (postfix: string) => `${itemBox(postfix)} label.${cssClassPrefix}form-check-label.c-and-monthday-item-label`,
			}
		})(),

		lastMonthday: (() => {
			const box = `.${cssClassPrefix}form-group.c-last-monthday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-last-monthday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-last-monthday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-last-monthday-option-label`;

			return {
				box,
				switcherBox,
				switcher,
				label
			}
		})(),

		lastWeekday: (() => {
			const box = `.${cssClassPrefix}form-group.c-last-weekday.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-last-weekday-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-last-weekday-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-last-weekday-option-label`;

			return {
				box,
				switcherBox,
				switcher,
				label
			}
		})(),

		lastNth: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-last-nth.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-last-nth-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-last-nth-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-last-nth-option-label`;
			const label2 = `${box} label.c-last-nth-option-label2`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-last-nth-weekday`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				label2,
				control
			}
		})(),

		dayBeforeEnd: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-day-before-end.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-day-before-end-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-day-before-end-option`;
			const label = `${box} label.c-day-before-end-option-label`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-day-before-end-monthday`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				control
			}
		})(),

		nearest: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-nearest.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-nearest-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-nearest-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-nearest-option-label`;
			const label2 = `${box} label.c-nearest-option-label2`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-nearest-monthday`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				label2,
				control
			}
		})(),

		nth: (() => {
			const box = `.${cssClassPrefix}form-group.${cssClassPrefix}form-inline.c-nth.c-segment`;
			const switcherBox = `${box} .${cssClassPrefix}form-check.c-nth-check`;
			const switcher = `${switcherBox} input.${cssClassPrefix}form-check-input.c-nth-option`;
			const label = `${switcherBox} label.${cssClassPrefix}form-check-label.c-nth-option-label`;
			const label2 = `${box} label.c-nth-option-label2`;
			const control = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-nth-every`;
			const control2 = `${box} select.${cssClassPrefix}form-control.${cssClassPrefix}form-control-sm.${cssClassPrefix}mx-1.c-nth-every-weekday`;

			return {
				box,
				switcherBox,
				switcher,
				label,
				label2,
				control,
				control2
			}
		})()
	}
};