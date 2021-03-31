import { Mode } from './../mode.enum';
import { Segment } from './../segment.enum';
import { Type } from './../type.enum';
import { CoreService } from './../core.service';
import { CronUIBaseService } from './ui-base.service';

export class CronQuartzUIService extends CronUIBaseService {
	private readonly api = {
		[Type.SECONDS]: this.generateApi(Segment.seconds),
		[Type.MINUTES]: this.generateApi(Segment.minutes),
		[Type.HOURS]: this.generateApi(Segment.hours),
		[Type.MONTH]: this.generateApi(Segment.month),
		[Type.YEAR]: this.generateApi(Segment.year),
		[Type.DAY]: {
			// Every day
			isEverySelected: () => [
				this.isSelectedSegment(Segment.dayOfWeek, Mode.EVERY),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.INCREMENT),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.AND),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.LAST_DAY_WEEK),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.LAST_DAY)
			].every(r => !!r),
			selectEvery: () => {
				const dayOfMonth = this.getSegmentView(Segment.dayOfMonth);
				dayOfMonth.values.NONE.values = ['?'];
				dayOfMonth.selected = Mode.NONE;
				this.setSegmentView(Segment.dayOfMonth, dayOfMonth);
				const dayOfWeek = this.getSegmentView(Segment.dayOfWeek);
				dayOfWeek.values.EVERY.values = ['*'];
				dayOfWeek.selected = Mode.EVERY;
				this.setSegmentView(Segment.dayOfWeek, dayOfWeek);
			},

			// Every 5 day(s) starting on Monday
			isDayOfWeekIncrementSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.INCREMENT),
			selectDayOfWeekIncrement: () => this.selectDaySegment(Mode.INCREMENT, Segment.dayOfWeek, Segment.dayOfMonth),
			isDayOfWeekIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, Segment.dayOfWeek),
			getDayOfWeekIncrementPrimary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.INCREMENT)[1],
			setDayOfWeekIncrementPrimary: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, Segment.dayOfWeek),
			getDayOfWeekIncrementSecondary: () => this.getSegmentValues(Segment.dayOfWeek, Mode.INCREMENT)[0],
			setDayOfWeekIncrementSecondary: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, Segment.dayOfWeek),

			// Every 3 day(s) starting on the 4th of the month
			isDayOfMonthIncrementSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.INCREMENT),
			selectDayOfMonthIncrement: () => this.selectDaySegment(Mode.INCREMENT, Segment.dayOfMonth, Segment.dayOfWeek),
			isDayOfMonthIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, Segment.dayOfMonth),
			getDayOfMonthIncrementPrimary: () => this.getSegmentValues(Segment.dayOfMonth, Mode.INCREMENT)[1],
			setDayOfMonthIncrementPrimary: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, Segment.dayOfMonth),
			getDayOfMonthIncrementSecondary: () => this.getSegmentValues(Segment.dayOfMonth, Mode.INCREMENT)[0],
			setDayOfMonthIncrementSecondary: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, Segment.dayOfMonth),

			// Specific day of week (choose one or many)
			isDayOfWeekAndSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.AND),
			selectDayOfWeekAnd: () => this.selectDaySegment(Mode.AND, Segment.dayOfWeek, Segment.dayOfMonth),
			isDayOfWeekAndControlsDisabled: () => this.isDisabled(Mode.AND, Segment.dayOfWeek),
			isSelectedDayOfWeekAndValue: (value: string) => this.hasAndValue(value, Segment.dayOfWeek),
			selectDayOfWeekAndValue: (value: string) => this.toggleAndValue(value, Segment.dayOfWeek),

			// Specific day of month (choose one or many)
			isDayOfMonthAndSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.AND),
			selectDayOfMonthAnd: () => this.selectDaySegment(Mode.AND, Segment.dayOfMonth, Segment.dayOfWeek),
			isDayOfMonthAndControlsDisabled: () => this.isDisabled(Mode.AND, Segment.dayOfMonth),
			isSelectedDayOfMonthAndValue: (value: string) => this.hasAndValue(value, Segment.dayOfMonth),
			selectDayOfMonthAndValue: (value: string) => this.toggleAndValue(value, Segment.dayOfMonth),

			// On the last day of the month
			isDayOfMonthLastDaySelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.LAST_DAY),
			selectDayOfMonthLastDay: () => this.selectDaySegment(Mode.LAST_DAY, Segment.dayOfMonth, Segment.dayOfWeek, 'L'),

			// On the last day of the month
			isDayOfMonthLastDayWeekSelected: () => this.view.dayOfMonth.selected === Mode.LAST_DAY_WEEK,
			selectDayOfMonthLastDayWeek: () => this.selectDaySegment(Mode.LAST_DAY_WEEK, Segment.dayOfMonth, Segment.dayOfWeek, 'LW'),

			// On the last Sunday of the month
			isDayOfWeekLastNTHDayWeekSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.LAST_NTH_DAY_WEEK),
			selectDayOfWeekLastNTHDayWeek: () => this.selectDaySegment(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, Segment.dayOfMonth),
			isDayOfWeekLastNTHDayWeekControlsDisabled: () => this.isDisabled(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek),
			getDayOfWeekLastNTHDayWeekValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.LAST_NTH_DAY_WEEK)[0],
			setDayOfWeekLastNTHDayWeekValue: (value: string) => this.setInValue(Mode.LAST_NTH_DAY_WEEK, 0, value, Segment.dayOfWeek),

			// 1 day(s) before the end of the month
			isDayOfMonthDaysBeforeEndMonthSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH),
			selectDayOfMonthDaysBeforeEndMonth: () => this.selectDaySegment(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, Segment.dayOfWeek),
			isDayOfMonthDaysBeforeEndMonthControlsDisabled: () => this.isDisabled(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth),
			getDayOfMonthDaysBeforeEndMonthValue: () => this.getSegmentValues(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH)[0],
			setDayOfMonthDaysBeforeEndMonthValue: (value: string) => this.setInValue(Mode.DAYS_BEFORE_END_MONTH, 0, value, Segment.dayOfMonth),

			// Nearest weekday (Monday to Friday) to the 1st of the month
			isDayOfMonthNearestWeekDayOfMonthSelected: () => this.isSelectedSegment(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH),
			selectDayOfMonthNearestWeekDayOfMonth: () => this.selectDaySegment(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, Segment.dayOfWeek),
			isDayOfMonthNearestWeekDayOfMonthControlsDisabled: () => this.isDisabled(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth),
			getDayOfMonthNearestWeekDayOfMonthValue: () => this.getSegmentValues(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH)[0],
			setDayOfMonthNearestWeekDayOfMonthValue: (value: string) => this.setInValue(Mode.NEAREST_WEEKDAY_OF_MONTH, 0, value, Segment.dayOfMonth),

			// On the 1st Sunday of the month
			isDayOfWeekNTHWeekDayOfMonthSelected: () => this.isSelectedSegment(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH),
			selectDayOfWeekNTHWeekDayOfMonth: () => this.selectDaySegment(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, Segment.dayOfMonth),
			isDayOfWeekNTHWeekDayOfMonthControlsDisabled: () => this.isDisabled(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek),
			getDayOfWeekNTHWeekDayOfMonthPrimaryValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)[1],
			setDayOfWeekNTHWeekDayOfMonthPrimaryValue: (value: string) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 1, value, Segment.dayOfWeek),
			getDayOfWeekNTHWeekDayOfMonthSecondaryValue: () => this.getSegmentValues(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)[0],
			setDayOfWeekNTHWeekDayOfMonthSecondaryValue: (value: string) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 0, value, Segment.dayOfWeek)
		}
	};

	constructor(coreService: CoreService) {
		super(coreService);
	}

	getApi<T extends Type>(type: Type) {
		return this.api[type] as InstanceType<typeof CronQuartzUIService>['api'][T];
	}

	private selectDaySegment(mode: Mode, segment: Segment.dayOfMonth|Segment.dayOfWeek, reset?: Segment.dayOfMonth|Segment.dayOfWeek, value?: string) {
		const view = this.getSegmentView(segment);
		view.selected = mode;
		this.setSegmentView(segment, view);

		if (reset === Segment.dayOfMonth) {
			this.resetsDaysOfMonth();
		}
		if (reset === Segment.dayOfWeek) {
			this.resetDaysOfWeek();
		}
		if (value) {
			this.setInValue(mode, 0, value, segment);
		}
	}

	private resetsDaysOfMonth() {
		const dayOfMonth = this.getSegmentView(Segment.dayOfMonth);
		dayOfMonth.selected = Mode.NONE;
		dayOfMonth.values.NONE.values = ['*'];
		this.setSegmentView(Segment.dayOfMonth, dayOfMonth);
	}

	private resetDaysOfWeek() {
		const dayOfWeek = this.getSegmentView(Segment.dayOfWeek);
		dayOfWeek.selected = Mode.NONE;
		dayOfWeek.values.NONE.values = ['*'];
		this.setSegmentView(Segment.dayOfWeek, dayOfWeek);
	}

	private generateApi(segment: Segment) {
		return {
			isEverySelected: () => this.isSelectedSegment(segment, Mode.EVERY),
			selectEvery: () => {
				this.selectSegment(segment, Mode.EVERY);
				const view = this.getSegmentView(segment);
				view.values.EVERY.values = ['*'];
				this.setSegmentView(segment, view);
			},
	
			// Every 2 hour(s) starting at hour 3
			isIncrementSelected: () => this.isSelectedSegment(segment, Mode.INCREMENT),
			selectIncrement: () => this.selectSegment(segment, Mode.INCREMENT),
			isIncrementControlsDisabled: () => this.isDisabled(Mode.INCREMENT, segment),
			getIncrementPrimaryValue: () => this.getSegmentValues(segment, Mode.INCREMENT)[1],
			setIncrementPrimaryValue: (value: string) => this.setInValue(Mode.INCREMENT, 1, value, segment),
			getIncrementSecondaryValue: () => this.getSegmentValues(segment, Mode.INCREMENT)[0],
			setIncrementSecondaryValue: (value: string) => this.setInValue(Mode.INCREMENT, 0, value, segment),
	
			// Specific hour (choose one or many)
			isAndSelected: () => this.isSelectedSegment(segment, Mode.AND),
			selectAnd: () => this.selectSegment(segment, Mode.AND),
			isAndControlsDisabled: () => this.isDisabled(Mode.AND, segment),
			isSelectedAndValue: (value: string) => this.hasAndValue(value, segment),
			selectAndValue: (value: string) => this.toggleAndValue(value, segment),
	
			// Every hour between hour 0 and hour
			isRangeSelected: () => this.isSelectedSegment(segment, Mode.RANGE),
			selectRange: () => this.selectSegment(segment, Mode.RANGE),
			isRangeControlsDisabled: () => this.isDisabled(Mode.RANGE, segment),
			getRangePrimaryValue: () => this.getSegmentValues(segment, Mode.RANGE)[0],
			setRangePrimaryValue: (value: string) => this.setInValue(Mode.RANGE, 0, value, segment),
			getRangeSecondaryValue: () => this.getSegmentValues(segment, Mode.RANGE)[1],
			setRangeSecondaryValue: (value: string) => this.setInValue(Mode.RANGE, 1, value, segment)
		};
	}
}