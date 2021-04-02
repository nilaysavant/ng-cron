import { Type, CronType, MonthUtils, CoreService, WeekDayUtils } from '@sbzen/cron-core';

const tab2Localization = new Map([
	[Type.SECONDS, 'second'],
	[Type.MINUTES, 'minute'],
	[Type.HOURS, 'hour'],
	[Type.MONTH, 'month'],
	[Type.YEAR, 'year'],
	[Type.DAY, 'day']
]);

export const testLocalization = (type: string) => {
	const cronType = type === 'ReUnixCron' ? CronType.UNIX : CronType.QUARTZ;
	const cronLocalizationProp = type === 'ReUnixCron' ? 'unix' : 'quartz';

	describe(type, () => {
		beforeEach(() => {
			cy.visit('/');
			findInContainer('[data-cron-action="localization-reset"]').click();
			findInContainer('[data-cron-action="localization-use"]').click();
		});

		describe('tabs should be localizable', () => {
			testTabs();
			testMinutesTab();
			testHoursTab();
			testMonthTab();
			testDayTab();

			if (cronType === CronType.QUARTZ) {
				testSecondsTab();
				testYearTab();
			}
		});

		function testTabs() {
			it('tab buttons should be localizable', () => {
				let tabs = [Type.SECONDS, Type.MINUTES, Type.HOURS, Type.MONTH, Type.DAY, Type.YEAR];
				if (cronType === CronType.UNIX) {
					tabs = [Type.MINUTES, Type.HOURS, Type.MONTH, Type.DAY];
				}
				tabs.forEach(tab => {
					checkLocalizationField(
						`[data-cron-action-value="tabs.${tab.toLowerCase()}"]`,
						`.c-tabs .c-tab.${tab}`
					);
				});
			});
		}

		function testDayTab() {
			describe(`test tab: ${Type.DAY}`, () => {
				beforeEach(() => activateTab(Type.DAY));

				it('every weekday segment', () => {
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'every.label'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-every-weekday .c-every-weekday-option-label`
					);
				});
				
				it('increment weekday segment', () => {
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfWeekIncrement.label1'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-weekday .c-increment-weekday-option-label`
					);
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfWeekIncrement.label2'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-weekday .c-increment-weekday-option-label2`
					);

					if (cronType === CronType.QUARTZ) {
						WeekDayUtils.list().forEach((weekday, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfWeek.${weekday.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-weekday .c-increment-weekday-from option[value="${i + 1}"]`
							);
						});
					}
				});
				
				it('increment day of month segment', () => {
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfMonthIncrement.label1'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-monthday .c-increment-monthday-option-label`
					);
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfMonthIncrement.label2'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-monthday .c-increment-monthday-option-label2`
					);

					if (cronType === CronType.QUARTZ) {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthIncrement.label3'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-monthday .c-increment-monthday-option-label3`
						);

						MonthUtils.everyList().forEach((every, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfMonth.${every.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-increment-monthday .c-increment-monthday-from option[value="${i + 1}"]`
							);
						});
					}
				});

				it('and day of week segment', () => {
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfWeekAnd.label'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-and-weekday .c-and-weekday-option-label`
					);

					WeekDayUtils.list().forEach(weekday => {
						const code = WeekDayUtils.getCode(weekday);
						checkLocalizationField(
							`[data-cron-action-value="common.dayOfWeek.${weekday.toLowerCase()}"]`,
							`.c-tab-content[tab-name="${Type.DAY}"] .c-and-weekday .c-and-weekday-item[item-value="${code}"] .c-and-weekday-item-label`
						);
					});
				});

				it('and day of month segment', () => {
					checkLocalizationField(
						buildFieldSelector(Type.DAY, 'dayOfMonthAnd.label'),
						`.c-tab-content[tab-name="${Type.DAY}"] .c-and-monthday .c-and-monthday-option-label`
					);
				});

				if (cronType === CronType.QUARTZ) {
					it('day of month last day segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthLastDay.label'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-last-monthday .c-last-monthday-option-label`
						);
					});

					it('day of month last day week segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthLastDayWeek.label'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-last-weekday .c-last-weekday-option-label`
						);
					});

					it('day of week last nth day week segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfWeekLastNTHDayWeek.label1'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-last-nth .c-last-nth-option-label`
						);
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfWeekLastNTHDayWeek.label2'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-last-nth .c-last-nth-option-label2`
						);

						WeekDayUtils.list().forEach((weekday, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfWeek.${weekday.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-last-nth .c-last-nth-weekday option[value="${i + 1}L"]`
							);
						});
					});

					it('day of month days before end month segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthDaysBeforeEndMonth.label'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-day-before-end .c-day-before-end-option-label`
						);
					});

					it('day of month nearest week day of month segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthNearestWeekDayOfMonth.label1'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-nearest .c-nearest-option-label`
						);
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfMonthNearestWeekDayOfMonth.label2'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-nearest .c-nearest-option-label2`
						);

						MonthUtils.everyList().forEach((weekday, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfMonth.${weekday.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-nearest .c-nearest-monthday option[value="${i + 1}W"]`
							);
						});
					});

					it('day of week nth week day of month segment', () => {
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfWeekNTHWeekDayOfMonth.label1'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-nth .c-nth-option-label`
						);
						checkLocalizationField(
							buildFieldSelector(Type.DAY, 'dayOfWeekNTHWeekDayOfMonth.label2'),
							`.c-tab-content[tab-name="${Type.DAY}"] .c-nth .c-nth-option-label2`
						);

						MonthUtils.everyList().slice(0, 5).forEach((weekday, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfMonth.${weekday.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-nth .c-nth-every option[value="${i + 1}"]`
							);
						});

						WeekDayUtils.list().forEach((weekday, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.dayOfWeek.${weekday.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${Type.DAY}"] .c-nth .c-nth-every-weekday option[value="${i + 1}"]`
							);
						});
					});
				}
			});
		}

		function testSecondsTab() {
			describe(`test tab: ${Type.SECONDS}`, () => {
				testEverySegment(Type.SECONDS);
				testIncrementSegment(Type.SECONDS);
				testAndSegment(Type.SECONDS);
				testRangeSegment(Type.SECONDS);
			});
		}

		function testMinutesTab() {
			describe(`test tab: ${Type.MINUTES}`, () => {
				testEverySegment(Type.MINUTES);
				testIncrementSegment(Type.MINUTES);
				testAndSegment(Type.MINUTES);
				testRangeSegment(Type.MINUTES);
			});
		}

		function testHoursTab() {
			describe(`test tab: ${Type.HOURS}`, () => {
				testEverySegment(Type.HOURS);
				testIncrementSegment(Type.HOURS);
				testAndSegment(Type.HOURS);
				testRangeSegment(Type.HOURS);
			});
		}

		function testMonthTab() {
			describe(`test tab: ${Type.MONTH}`, () => {
				testEverySegment(Type.MONTH);
				testIncrementSegment(Type.MONTH);
				testAndSegment(Type.MONTH);
				testRangeSegment(Type.MONTH);
			});
		}

		function testYearTab() {
			describe(`test tab: ${Type.YEAR}`, () => {
				testEverySegment(Type.YEAR);
				testIncrementSegment(Type.YEAR);
				testAndSegment(Type.YEAR);
				testRangeSegment(Type.YEAR);
			});
		}

		function testEverySegment(tab: Type) {
			it(`test every segment of tab: ${tab}`, () => {
				activateTab(tab);
				checkLocalizationField(
					buildFieldSelector(tab, 'every.label'),
					`.c-tab-content[tab-name="${tab}"] .c-every .c-every-option-label`
				);
			});
		}

		function testIncrementSegment(tab: Type) {
			it(`test increment segment of tab: ${tab}`, () => {
				activateTab(tab);
				checkLocalizationField(
					buildFieldSelector(tab, 'increment.label1'),
					`.c-tab-content[tab-name="${tab}"] .c-increment .c-increment-option-label`
				);

				if (cronType === CronType.QUARTZ) {
					checkLocalizationField(
						buildFieldSelector(tab, 'increment.label2'),
						`.c-tab-content[tab-name="${tab}"] .c-increment .c-increment-option-label2`
					);
					if (tab === Type.MONTH) {
						MonthUtils.list().forEach((month, i) => {
							checkLocalizationField(
								`[data-cron-action-value="common.month.${month.toLowerCase()}"]`,
								`.c-tab-content[tab-name="${tab}"] .c-increment .c-increment-from option[value="${i + 1}"]`
							);
						});
					}
				}
			});
		}

		function testAndSegment(tab: Type) {
			it(`test and segment of tab: ${tab}`, () => {
				activateTab(tab);
				checkLocalizationField(
					buildFieldSelector(tab, 'and.label'),
					`.c-tab-content[tab-name="${tab}"] .c-and .c-and-option-label`
				);

				if (tab === Type.MONTH) {
					CoreService.getMonthCodes().forEach(({ value }) => {
						const month = MonthUtils.getMonth(value);
						checkLocalizationField(
							`[data-cron-action-value="common.month.${month.toLowerCase()}"]`,
							`.c-tab-content[tab-name="${tab}"] .c-and .c-and-item[item-value="${value}"] .c-and-item-label`
						);
					});
				}
			});
		}

		function testRangeSegment(tab: Type) {
			it(`test range segment of tab: ${tab}`, () => {
				activateTab(tab);
				checkLocalizationField(
					buildFieldSelector(tab, 'range.label1'),
					`.c-tab-content[tab-name="${tab}"] .c-range .c-range-option-label`
				);
				checkLocalizationField(
					buildFieldSelector(tab, 'range.label2'),
					`.c-tab-content[tab-name="${tab}"] .c-range .c-range-option-label2`
				);

				if (tab === Type.MONTH) {
					MonthUtils.list().forEach((month, i) => {
						checkLocalizationField(
							`[data-cron-action-value="common.month.${month.toLowerCase()}"]`,
							`.c-tab-content[tab-name="${tab}"] .c-range .c-range-from option[value="${i + 1}"]`
						);
						checkLocalizationField(
							`[data-cron-action-value="common.month.${month.toLowerCase()}"]`,
							`.c-tab-content[tab-name="${tab}"] .c-range .c-range-to option[value="${i + 1}"]`
						);
					});
				}
			});
		}

		function activateTab(tab: Type) {
			findInContainer('.c-tabs').find(`.c-tab.${tab}`).click();
		}

		function findLocalizationField(selector: string) {
			return findInContainer(`[data-cron-action="localization-field"]${selector}`)
		}

		function findInContainer(selector: string) {
			return cy.get(`[data-cron-type="${type}"]`).find(selector);
		}

		function buildFieldSelector(tab: Type, postfix: string) {
			return `[data-cron-action-value="${cronLocalizationProp}.${tab2Localization.get(tab)}.${postfix}"]`;
		}

		function checkLocalizationField(fieldSelector: string, textSelector: string) {
			const text = Math.random().toString();
			findLocalizationField(fieldSelector).clear().type(text);
			const label = findInContainer(textSelector);
			label.should('have.text', text);
		}
	});
};