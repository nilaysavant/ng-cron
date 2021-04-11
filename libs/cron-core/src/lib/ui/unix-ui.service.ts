import { Mode } from './../mode.enum';
import { Segment } from './../segment.enum';
import { Type } from './../type.enum';
import { CoreService } from './../core.service';
import { CronUIBaseService } from './ui-base.service';

type UnixType = Type.DAY | Type.HOURS | Type.MINUTES | Type.MONTH;

export class CronUnixUIService extends CronUIBaseService {
	private readonly api = {
		[Type.MINUTES]: this.generateApi(Segment.minutes),
		[Type.HOURS]: this.generateApi(Segment.hours),
		[Type.MONTH]: this.generateApi(Segment.month),
		[Type.DAY]: {
			// Every day
			isEverySelected: () => [
				this.isSelectedSegment(Segment.dayOfWeek, Mode.EVERY),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.INCREMENT),
				!this.isSelectedSegment(Segment.dayOfMonth, Mode.AND)
			].every(r => !!r),
			selectEvery: () => {
				const dayOfMonth = this.getSegmentView(Segment.dayOfMonth);
				dayOfMonth.values.NONE.values = ['*'];
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
			selectDayOfMonthAndValue: (value: string) => this.toggleAndValue(value, Segment.dayOfMonth)
		}
	};

	constructor(coreService: CoreService) {
		super(coreService);
	}

	getApi<T extends UnixType>(type: UnixType) {
		return this.api[type] as InstanceType<typeof CronUnixUIService>['api'][T];
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