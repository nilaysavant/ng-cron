import { Mode, ModeUtils } from './mode.enum';
import { Segment } from './segment.enum';
import { ValueModel } from './value.model';
import { WeekDayUtils } from './week-day.enum';
import { MonthUtils } from './month.enum';
import { DataModel } from './data.model';

export abstract class CoreService {
	private seconds = this.genList(0, 59);
	private secondsEvery = this.genList(1, 60);

	private minutes = this.genList(0, 59);
	private minutesEvery = this.genList(1, 60);

	private hours = this.genList(0, 23);
	private hoursEvery = this.genList(1, 24);

	private year = this.genList(2019, 2098);
	private yearEvery = this.genList(1, 93);

	private dayOfMonth = this.genList(1, 31);
	private dayOfMonthEvery = this.createOptions(MonthUtils.everyList());

	private dayOfWeek = this.createOptions(WeekDayUtils.list());
	private dayOfWeekEvery = this.genList(1, 7);

	private month = this.createOptions(MonthUtils.list());
	private monthEvery = this.genList(1, 12);

	abstract toString(model: DataModel): string;
	abstract toModel(expression?: string): DataModel;
	abstract stringifySegment(v: ValueModel): string;

	getDaysOfWeekCodes() {
		return WeekDayUtils
			.list()
			.map(v => {
				return {
					value: WeekDayUtils.getCode(v),
					label: v
				};
			});
	}

	getMonthCodes() {
		return MonthUtils
			.list()
			.map(v => {
				return {
					value: MonthUtils.getCode(v),
					label: v
				};
			});
	}

	getList(segment: Segment, every = false) {
		if (segment === Segment.seconds) {
			return every ? this.secondsEvery : this.seconds;
		}
		if (segment === Segment.minutes) {
			return every ? this.minutesEvery : this.minutes;
		}
		if (segment === Segment.hours) {
			return every ? this.hoursEvery : this.hours;
		}
		if (segment === Segment.dayOfMonth) {
			return every ? this.dayOfMonthEvery : this.dayOfMonth;
		}
		if (segment === Segment.year) {
			return every ? this.yearEvery : this.year;
		}
		if (segment === Segment.month) {
			return every ? this.monthEvery : this.month;
		}
		if (segment === Segment.dayOfWeek) {
			return every ? this.dayOfWeekEvery : this.dayOfWeek;
		}
		return [];
	}

	protected parseSegment(segment: string, valueType: Segment) {
		const mode = ModeUtils.detect(segment);
		const rawValues = ModeUtils.parseToValues(segment, mode);
		const values = this.normalizeValues(mode, rawValues, valueType);
		return new ValueModel({ mode, values });
	}

	private normalizeValues(mode: Mode, values: string[], valueType: Segment) {

		// conver 1,2,3 to SUN,MON,TUE
		if (valueType === Segment.dayOfWeek && mode === Mode.AND) {
			return values
				.map(v => {
					const value = +v;
					if (isNaN(value)) {
						return v;
					}
					const weekDay = WeekDayUtils.list()[value];
					return WeekDayUtils.getCode(weekDay);
				})
				.filter(v => !!v);
		}
		return values;
	}

	private createOptions(labels: string[]) {
		return labels.map((v, i) => {
			return {
				label: v,
				value: (i + 1).toString()
			};
		});
	}

	private genList(from: number, to: number) {
		const list: {value: string, label: string}[] = [];
		for (let x = from; x <= to; x++) {
			list.push({value: `${x}`, label: `${x}`});
		}
		return list;
	}
}
