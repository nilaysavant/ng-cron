import { Mode, ModeUtils } from './mode.enum';
import { Segment } from './segment.enum';
import { ValueModel } from './value.model';
import { WeekDayUtils } from './week-day.enum';
import { MonthUtils } from './month.enum';
import { DataModel } from './data.model';

export abstract class CoreService {
	private static seconds = CoreService.genList(0, 59);
	private static secondsEvery = CoreService.genList(1, 60);

	private static minutes = CoreService.genList(0, 59);
	private static minutesEvery = CoreService.genList(1, 60);

	private static hours = CoreService.genList(0, 23);
	private static hoursEvery = CoreService.genList(1, 24);

	private static year = CoreService.genList(2019, 2098);
	private static yearEvery = CoreService.genList(1, 93);

	private static dayOfMonth = CoreService.genList(1, 31);
	private static dayOfMonthEvery = CoreService.createOptions(MonthUtils.everyList());

	private static dayOfWeek = CoreService.createOptions(WeekDayUtils.list());
	private static dayOfWeekEvery = CoreService.genList(1, 7);

	private static month = CoreService.createOptions(MonthUtils.list());
	private static monthEvery = CoreService.genList(1, 12);

	private static genList(from: number, to: number) {
		const list: {value: string, label: string}[] = [];
		for (let x = from; x <= to; x++) {
			list.push({value: `${x}`, label: `${x}`});
		}
		return list;
	}

	private static createOptions(labels: string[]) {
		return labels.map((v, i) => {
			return {
				label: v,
				value: (i + 1).toString()
			};
		});
	}

	static getDaysOfWeekCodes() {
		return WeekDayUtils
			.list()
			.map(v => ({
				value: WeekDayUtils.getCode(v),
				label: v
			}));
	}

	static getMonthCodes() {
		return MonthUtils
			.list()
			.map(v => ({
				value: MonthUtils.getCode(v),
				label: v
			}));
	}

	static getList(segment: Segment, every = false) {
		if (segment === Segment.seconds) {
			return every ? CoreService.secondsEvery : CoreService.seconds;
		}
		if (segment === Segment.minutes) {
			return every ? CoreService.minutesEvery : CoreService.minutes;
		}
		if (segment === Segment.hours) {
			return every ? CoreService.hoursEvery : CoreService.hours;
		}
		if (segment === Segment.dayOfMonth) {
			return every ? CoreService.dayOfMonthEvery : CoreService.dayOfMonth;
		}
		if (segment === Segment.year) {
			return every ? CoreService.yearEvery : CoreService.year;
		}
		if (segment === Segment.month) {
			return every ? CoreService.monthEvery : CoreService.month;
		}
		if (segment === Segment.dayOfWeek) {
			return every ? CoreService.dayOfWeekEvery : CoreService.dayOfWeek;
		}
		return [];
	}

	abstract toString(model: DataModel): string;
	abstract toModel(expression?: string): DataModel;
	abstract stringifySegment(v: ValueModel): string;

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
}
