import { Mode } from './../mode.enum';
import { Segment, getSegmentsList } from './../segment.enum';
import { ValueModel } from './../value.model';
import { ViewData, ViewDataItem } from './../view.type';
import { MonthCode } from './../month.enum';
import { DataModel } from './../data.model';
import { CoreService } from './../core.service';

export abstract class CronUIBaseService {
	protected view = this.createView({
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
				RANGE: this.createValue(['1', '2'], Mode.RANGE),
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
	});

	private listeners: {
		[prop: string]: ((view: ViewDataItem) => void)[]
	} = {
		[Segment.seconds]: [],
		[Segment.minutes]: [],
		[Segment.hours]: [],
		[Segment.month]: [],
		[Segment.year]: [],
		[Segment.dayOfMonth]: [],
		[Segment.dayOfWeek]: [],
	};
	private disabled = false;

	constructor(protected coreService: CoreService) {}

	destroy() {
		this.listeners = {};
	}

	listen(segments: Segment[], cb: (view: ViewDataItem) => void) {
		segments.forEach(s => {
			this.listeners[s].push(cb);
		});

		return () => {
			segments.forEach(s => {
				const listeners = this.listeners[s] || [];
				this.listeners[s] = listeners.filter(c => c !== cb);
			});
		};
	}

	toString() {
		const m = this.genDataModel();
		return this.coreService.toString(m);
	}

	fillFromExpression(cronExpression: string) {
		cronExpression = cronExpression.replace(/[ ]{2,}/g, ' ');
		const m = this.coreService.toModel(cronExpression);

		Object.keys(m).forEach((prop: keyof DataModel) => {
			this.view[prop].selected = m[prop].mode;
			this.view[prop].values[m[prop].mode] = m[prop];
			this.view[prop] = Object.assign({}, this.view[prop]);
		});
		this.view = this.createView(this.view);
		this.emitListener([
			Segment.seconds,
			Segment.minutes,
			Segment.hours,
			Segment.month,
			Segment.year,
			Segment.dayOfMonth,
			Segment.dayOfWeek
		]);
	}

	setDisabled(disabled = false) {
		this.disabled = disabled;
		const segments = getSegmentsList();
		this.emitListener(segments);
	}

	isDisabled(mode?: Mode, segment?: Segment) {
		let disabled = this.disabled;
		if (segment && mode) {
			const view = this.getSegmentView(segment);
			disabled = disabled || view.selected !== mode;
		}
		return disabled;
	}

	getSegmentView(segment: Segment) {
		return this.createView(this.view)[segment];
	}

	protected setSegmentView(segment: Segment, viewItem: ViewDataItem) {
		const view = this.createView({
			...this.view,
			[segment]: viewItem
		});
		this.view = view;
		this.emitListener([segment]);
		return view;
	}

	protected isSelectedSegment(segment: Segment, mode: Mode) {
		return this.getSegmentView(segment).selected === mode;
	}

	protected selectSegment(segment: Segment, mode: Mode) {
		const view = this.getSegmentView(segment);
		view.selected = mode;
		return this.setSegmentView(segment, view);
	}

	protected hasAndValue(value: string, type: Segment) {
		const values = this.getSegmentValues(type, Mode.AND);
		return !!~values.indexOf(value);
	}

	protected getSegmentValues(segment: Segment, mode: Mode) {
		const store = this.getSegmentView(segment);
		return store.values[mode].values.concat();
	}

	protected toggleAndValue(value: string, segment: Segment) {
		const view = this.getSegmentView(segment);
		const values = view.values[Mode.AND].values;
		const isRemoving = !!~values.indexOf(value);
		if (isRemoving && values.length === 1) {
			return false;
		}

		if (isRemoving) {
			const i = values.indexOf(value);
			values.splice(i, 1);
		} else {
			values.push(value);
		}
		this.setSegmentView(segment, view)
		return true;
	}
	
	protected setInValue(mode: Mode, index: 0|1, value: string, segment: Segment) {
		const view = this.getSegmentView(segment);
		const values = view.values[mode].values;
		values[index] = value;
		this.setSegmentView(segment, view);
	}

	private emitListener(segments: Segment[]) {
		segments.forEach(s => {
			const view = this.getSegmentView(s);
			const cbs = this.listeners[s];
			cbs.forEach(cd => cd(view));
		});
	}

	private genDataModel() {
		const m = new DataModel();
		Object.keys(this.view)
			.forEach((prop: keyof DataModel) => {
				const i = this.view[prop];
				const selected = i.selected;
				const value = i.values[selected];
				// ignore not supported expressions
				if (!value) {
					return;
				}
				value.mode = i.selected;
				m[prop] = value;
			});
		return m;
	}

	private createValue(values: string[], mode: Mode) {
		return new ValueModel({ values, mode });
	}

	private createView(view: ViewData): ViewData {
		const { seconds, minutes, hours, month, dayOfMonth, dayOfWeek, year } = view;

		return {
			seconds: {
				selected: view.seconds.selected,
				values: {
					AND: this.createValue([...seconds.values.AND.values], Mode.AND),
					RANGE: this.createValue([...seconds.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...seconds.values.INCREMENT.values], Mode.INCREMENT),
					EVERY: this.createValue([...seconds.values.EVERY.values], Mode.EVERY),
				}
			},
			minutes: {
				selected: view.minutes.selected,
				values: {
					AND: this.createValue([...minutes.values.AND.values], Mode.AND),
					RANGE: this.createValue([...minutes.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...minutes.values.INCREMENT.values], Mode.INCREMENT),
					EVERY: this.createValue([...minutes.values.EVERY.values], Mode.EVERY),
				}
			},
			hours: {
				selected: view.hours.selected,
				values: {
					RANGE: this.createValue([...hours.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...hours.values.INCREMENT.values], Mode.INCREMENT),
					AND: this.createValue([...hours.values.AND.values], Mode.AND),
					EVERY: this.createValue([...hours.values.EVERY.values], Mode.EVERY),
				}
			},
			month: {
				selected: view.month.selected,
				values: {
					AND: this.createValue([...month.values.AND.values], Mode.AND),
					RANGE: this.createValue([...month.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...month.values.INCREMENT.values], Mode.INCREMENT),
					EVERY: this.createValue([...month.values.EVERY.values], Mode.EVERY),
					NONE: this.createValue([...month.values.NONE.values], Mode.NONE)
				}
			},
			dayOfMonth: {
				selected: view.dayOfMonth.selected,
				values: {
					AND: this.createValue([...dayOfMonth.values.AND.values], Mode.AND),
					LAST_DAY: this.createValue([...dayOfMonth.values.LAST_DAY.values], Mode.LAST_DAY),
					NEAREST_WEEKDAY_OF_MONTH: this.createValue([...dayOfMonth.values.NEAREST_WEEKDAY_OF_MONTH.values], Mode.NEAREST_WEEKDAY_OF_MONTH),
					DAYS_BEFORE_END_MONTH: this.createValue([...dayOfMonth.values.DAYS_BEFORE_END_MONTH.values], Mode.DAYS_BEFORE_END_MONTH),
					LAST_DAY_WEEK: this.createValue([...dayOfMonth.values.LAST_DAY_WEEK.values], Mode.LAST_DAY_WEEK),
					RANGE: this.createValue([...dayOfMonth.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...dayOfMonth.values.INCREMENT.values], Mode.INCREMENT),
					EVERY: this.createValue([...dayOfMonth.values.EVERY.values], Mode.EVERY),
					NONE: this.createValue([...dayOfMonth.values.NONE.values], Mode.NONE)
				}
			},
			dayOfWeek: {
				selected: view.dayOfWeek.selected,
				values: {
					AND: this.createValue([...dayOfWeek.values.AND.values], Mode.AND),
					INCREMENT: this.createValue([...dayOfWeek.values.INCREMENT.values], Mode.INCREMENT),
					NTH_WEEKDAY_OF_MONTH: this.createValue([...dayOfWeek.values.NTH_WEEKDAY_OF_MONTH.values], Mode.NTH_WEEKDAY_OF_MONTH),
					LAST_NTH_DAY_WEEK: this.createValue([...dayOfWeek.values.LAST_NTH_DAY_WEEK.values], Mode.LAST_NTH_DAY_WEEK),
					NONE: this.createValue([...dayOfWeek.values.NONE.values], Mode.NONE),
					RANGE: this.createValue([...dayOfWeek.values.RANGE.values], Mode.RANGE),
					EVERY: this.createValue([...dayOfWeek.values.EVERY.values], Mode.EVERY)
				}
			},
			year: {
				selected: view.year.selected,
				values: {
					AND: this.createValue([...year.values.AND.values], Mode.AND),
					RANGE: this.createValue([...year.values.RANGE.values], Mode.RANGE),
					INCREMENT: this.createValue([...year.values.INCREMENT.values], Mode.INCREMENT),
					EVERY: this.createValue([...year.values.EVERY.values], Mode.EVERY)
				}
			}
		};
	}
}