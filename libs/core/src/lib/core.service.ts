import { Mode, ModeUtils } from './mode.enum';
import { DataModel } from './data.model';
import { Segment } from './segment.enum';
import { ValueModel } from './value.model';
import { WeekDayUtils } from './week-day.enum';
import { MonthUtils } from './month.enum';

export interface CronJobsSelectOption {
	value: string;
	label: string;
}

export class CoreService {
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

	toModel(expression?: string) {
		const model = new DataModel();
		if (!expression) {
			model.dayOfMonth.values = ['?'];
			model.hours.mode = Mode.AND;
			model.hours.values = ['0'];
			model.minutes.mode = Mode.AND;
			model.minutes.values = ['0'];
			model.seconds.mode = Mode.AND;
			model.seconds.values = ['0'];
			return model;
		}
		const keys = Object.keys(model) as (keyof DataModel)[];
		expression.split(' ')
			.forEach((s, i) => {
				const key = keys[i];
				const v = this.parseSegment(s);
				model[key] = v;
			});
		return model;
	}

	toString(model: DataModel) {
		const values = [
			this.stringifySegment(model.seconds),
			this.stringifySegment(model.minutes),
			this.stringifySegment(model.hours),
			this.stringifySegment(model.dayOfMonth),
			this.stringifySegment(model.month),
			this.stringifySegment(model.dayOfWeek),
			this.stringifySegment(model.year)
		];
		return values.join(' ');
	}

	stringifySegment(v: ValueModel) {
		const mode = v.mode;
		if (ModeUtils.containsSeparator(mode)) {
			return v.values.join(ModeUtils.getSeparator(mode));
		}
		return v.values.join('');
	}

	private parseSegment(segment: string) {
		const mode = ModeUtils.detect(segment);
		return new ValueModel({
			mode,
			values: ModeUtils.parseToValues(segment, mode)
		});
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
