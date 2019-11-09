import { Injectable } from '@angular/core';

import { Segment, Mode, DataModel, ValueModel, ViewData, MonthCode, CoreService } from '@sbzen/cron-core';

@Injectable()
export class QuartzCronService {
	private view: ViewData = {
		seconds: {
			selected: Mode.AND,
			values: {
				AND: this.createValue(['0'], Mode.AND),
				RANGE: this.createValue(['0', '0'], Mode.RANGE),
				INCREMENT: this.createValue(['0', '1'], Mode.INCREMENT),
				EVERY: this.createValue(['*'], Mode.EVERY),
			}
		},
		minutes: {
			selected: Mode.AND,
			values: {
				AND: this.createValue(['0'], Mode.AND),
				RANGE: this.createValue(['0', '0'], Mode.RANGE),
				INCREMENT: this.createValue(['0', '1'], Mode.INCREMENT),
				EVERY: this.createValue(['*'], Mode.EVERY),
			}
		},
		hours: {
			selected: Mode.AND,
			values: {
				RANGE: this.createValue(['0', '0'], Mode.RANGE),
				INCREMENT: this.createValue(['0', '1'], Mode.INCREMENT),
				AND: this.createValue(['0'], Mode.AND),
				EVERY: this.createValue(['*'], Mode.EVERY),
			}
		},
		month: {
			selected: Mode.EVERY,
			values: {
				AND: this.createValue([MonthCode.JAN], Mode.AND),
				RANGE: this.createValue(['1', '1'], Mode.RANGE),
				INCREMENT: this.createValue(['1', '1'], Mode.INCREMENT),
				EVERY: this.createValue(['*'], Mode.EVERY),
				NONE: this.createValue(['*'], Mode.NONE)
			}
		},
		dayOfMonth: {
			selected: Mode.NONE,
			values: {
				AND: this.createValue(['1'], Mode.AND),
				LAST_DAY: this.createValue(['L'], Mode.LAST_DAY),
				NEAREST_WEEKDAY_OF_MONTH: this.createValue(['1W'], Mode.NEAREST_WEEKDAY_OF_MONTH),
				DAYS_BEFORE_END_MONTH: this.createValue(['L-1'], Mode.DAYS_BEFORE_END_MONTH),
				LAST_DAY_WEEK: this.createValue(['LW'], Mode.LAST_DAY_WEEK),
				RANGE: this.createValue(['0', '0'], Mode.RANGE),
				INCREMENT: this.createValue(['1', '1'], Mode.INCREMENT),
				EVERY: this.createValue(['*'], Mode.EVERY),
				NONE: this.createValue([''], Mode.NONE)
			}
		},
		dayOfWeek: {
			selected: Mode.NONE,
			values: {
				AND: this.createValue(['SUN'], Mode.AND),
				INCREMENT: this.createValue(['1', '1'], Mode.INCREMENT),
				NTH_WEEKDAY_OF_MONTH: this.createValue(['1', '1'], Mode.NTH_WEEKDAY_OF_MONTH),
				LAST_NTH_DAY_WEEK: this.createValue(['1L'], Mode.LAST_NTH_DAY_WEEK),
				NONE: this.createValue([''], Mode.NONE),
				EVERY: this.createValue(['*'], Mode.EVERY)
			}
		},
		year: {
			selected: Mode.EVERY,
			values: {
				AND: this.createValue(['2019'], Mode.AND),
				RANGE: this.createValue(['2019', '2019'], Mode.RANGE),
				INCREMENT: this.createValue(['2019', '1'], Mode.INCREMENT),
				EVERY: this.createValue(['*'], Mode.EVERY)
			}
		}
	};

	constructor(private coreService: CoreService) {}

	getView(segment: Segment) {
		return this.view[segment];
	}

	toString() {
		const m = this.genDataModel();
		return this.coreService.toString(m);
	}

	fillFromExpression(cronExpression: string) {
		const m = this.coreService.toModel(cronExpression);

		Object.keys(m).forEach((prop: keyof DataModel) => {
			this.view[prop].selected = m[prop].mode;
			this.view[prop].values[m[prop].mode] = m[prop];
			this.view[prop] = Object.assign({}, this.view[prop]);
		});
	}

	hasValue(value: string, type: Segment, mode: Mode) {
		const values = this.getValues(type, mode);
		return !!~values.indexOf(value);
	}

	getValues(type: Segment, mode: Mode) {
		const store = this.view[type];
		return store.values[mode].values;
	}

	private genDataModel() {
		const m = new DataModel();
		Object.keys(this.view)
			.forEach((prop: keyof DataModel) => {
				const i = this.view[prop];
				const selected = i.selected;
				const value = i.values[selected];
				value.mode = i.selected;
				m[prop] = value;
			});
		return m;
	}

	private createValue(values: string[], mode: Mode) {
		return new ValueModel({
			values,
			mode
		});
	}
}
