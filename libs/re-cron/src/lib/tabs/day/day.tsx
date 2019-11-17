import React from 'react';
import { Segment, CoreService, Mode, ViewDataItem } from '@sbzen/cron-core';

import { QuartzCronDI } from './../../cron-di';
import { TabBaseProps, TabBaseComponent } from './../tab-base.component';

type TabSegments = Segment.dayOfMonth|Segment.dayOfWeek;

type Option = {
	value: string;
	label: string;
}

type ReCronDayState = {
	daysOfWeekEvery: Option[];
	daysOfWeek: Option[];
	daysOfWeekCodes: Option[];
	daysOfMonthEvery: Option[];
	daysOfMonth: Option[];
	limitedDaysOfMonth: Option[];
	dayOfMonth: ViewDataItem;
	dayOfWeek: ViewDataItem;
};

export class ReCronDay extends TabBaseComponent<TabBaseProps, ReCronDayState> {
	resets = {
		daysOfMonth: () => {
			const dayOfMonth = this.getQuartzCron().getView(Segment.dayOfMonth);
			dayOfMonth.selected = Mode.NONE;
			dayOfMonth.values.NONE.values = ['?'];
			this.getQuartzCron().setView(Segment.dayOfMonth, dayOfMonth);
		},
		daysOfWeek: () => {
			const dayOfWeek = this.getQuartzCron().getView(Segment.dayOfWeek);
			dayOfWeek.selected = Mode.NONE;
			dayOfWeek.values.NONE.values = ['?'];
			this.getQuartzCron().setView(Segment.dayOfWeek, dayOfWeek);
		}
	};

	constructor(props: TabBaseProps) {
		super(props);

		const daysOfMonthEvery = new CoreService().getList(Segment.dayOfMonth, true);
		this.state = {
			daysOfWeekEvery: new CoreService().getList(Segment.dayOfWeek, true),
			daysOfWeek: new CoreService().getList(Segment.dayOfWeek),
			daysOfWeekCodes: new CoreService().getDaysOfWeekCodes(),
			daysOfMonthEvery: daysOfMonthEvery,
			daysOfMonth: new CoreService().getList(Segment.dayOfMonth),
			limitedDaysOfMonth: daysOfMonthEvery.slice(0, 5),
			dayOfMonth: QuartzCronDI.get(this.props.session).getView(Segment.dayOfMonth),
			dayOfWeek: QuartzCronDI.get(this.props.session).getView(Segment.dayOfWeek)
		};
	}

	render() {
		return (
			<div>
				<div className={this.genClassName(['form-group'], ['c-every-weekday'])}>
					<div className={this.genClassName(['form-check'], ['c-every-weekday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-every-weekday-option'])}
							type="radio"
							id={this.genId(Mode.EVERY, Segment.dayOfWeek)}
							value={Mode.EVERY}
							checked={this.state.dayOfWeek.selected === Mode.EVERY}
							disabled={this.isDisabled()}
							onChange={() => this.setEvery()} />

						<label
							className={this.genClassName(['form-check-label'], ['c-every-weekday-option-label'])}
							htmlFor={this.genId(Mode.EVERY, Segment.dayOfWeek)}>

							Every day
						</label>
					</div>
				</div>
				
				<div className={this.genClassName(['form-group', 'form-inline'], ['c-increment-weekday'])}>
					<div className={this.genClassName(['form-check'], ['c-increment-weekday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-increment-weekday-option'])}
							type="radio"
							id={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}
							value={Mode.INCREMENT}
							checked={this.state.dayOfWeek.selected === Mode.INCREMENT}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.INCREMENT, Segment.dayOfWeek, Segment.dayOfMonth)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-increment-weekday-option-label'])}
							htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}>

							Every
						</label>
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-every'])}
						disabled={this.isDisabled(Segment.dayOfWeek, Mode.INCREMENT)}
						value={this.getModelValues(Mode.INCREMENT, Segment.dayOfWeek)[1]}
						onChange={(e) => this.setInValue(Mode.INCREMENT, Segment.dayOfWeek, 1, e.target.value)}>

						{this.state.daysOfWeekEvery.map(item => {
							return (
								<option
									value={item.value}
									key={item.value}>
									{item.value}
								</option>
							);
						})}
					</select>

					<label
						className="c-increment-weekday-option-label2"
						htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}>
						day(s) starting on
					</label>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-from'])}
						disabled={this.isDisabled(Segment.dayOfWeek, Mode.INCREMENT)}
						value={this.getModelValues(Mode.INCREMENT, Segment.dayOfWeek)[0]}
						onChange={(e) => this.setInValue(Mode.INCREMENT, Segment.dayOfWeek, 0, e.target.value)}>

						{this.state.daysOfWeek.map(item => {
							return (
								<option
									key={item.value}
									value={item.value}>
									{item.label}
								</option>
							);
						})}
					</select>
				</div>
				
				<div className={this.genClassName(['form-group', 'form-inline'], ['c-increment-monthday'])}>
					<div className={this.genClassName(['form-check'], ['c-increment-monthday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-increment-monthday-option'])}
							type="radio"
							id={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}
							value={Mode.INCREMENT}
							checked={this.state.dayOfMonth.selected === Mode.INCREMENT}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.INCREMENT, Segment.dayOfMonth, Segment.dayOfWeek)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-increment-monthday-option-label'])}
							htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>

							Every
						</label>
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-every'])}
						disabled={this.isDisabled(Segment.dayOfMonth, Mode.INCREMENT)}
						value={this.getModelValues(Mode.INCREMENT, Segment.dayOfMonth)[1]}
						onChange={(e) => this.setInValue(Mode.INCREMENT, Segment.dayOfMonth, 1, e.target.value)}>

						{this.state.daysOfMonth.map(item => {
							return (
								<option
									key={item.value}
									value={item.value}>
									{item.value}
								</option>
							);
						})}
					</select>

					<label
						className="c-increment-monthday-option-label2"
						htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
						day(s) starting on the
					</label>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-from'])}
						disabled={this.isDisabled(Segment.dayOfMonth, Mode.INCREMENT)}
						value={this.getModelValues(Mode.INCREMENT, Segment.dayOfMonth)[0]}
						onChange={(e) => this.setInValue(Mode.INCREMENT, Segment.dayOfMonth, 0, e.target.value)}>

						{this.state.daysOfMonthEvery.map(item => {
							return (
								<option
									key={item.value}
									value={item.value}>
									{item.label}
								</option>
							);
						})}
					</select>

					<label
						className="c-increment-monthday-option-label3"
						htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
						of the month
					</label>
				</div>

				<div className={this.genClassName(['form-group'], ['c-and-weekday'])}>
					<div className={this.genClassName(['form-check'], ['c-and-weekday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-and-weekday-option'])}
							type="radio"
							id={this.genId(Mode.AND, Segment.dayOfWeek)}
							value={Mode.INCREMENT}
							checked={this.state.dayOfWeek.selected === Mode.AND}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.AND, Segment.dayOfWeek, Segment.dayOfMonth)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-and-weekday-option-label'])}
							htmlFor={this.genId(Mode.AND, Segment.dayOfWeek)}>

							Specific day of week (choose one or many)
						</label>
					</div>

					<div className={this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-weekday-list'])}>
						{this.state.daysOfWeekCodes.map(item => {
							return (
								<div
									className={this.genClassName(['col-2'], ['c-and-weekday-item'])}
									item-value={item.value}
									key={item.value}>

									<div className={this.genClassName(['form-check'], ['c-and-weekday-item-check'])}>
										<input
											className={this.genClassName(['form-check-input'], ['c-and-weekday-item-field'])}
											type="checkbox"
											id={this.genId(Mode.AND, Segment.dayOfWeek + item.value)}
											value={item.value}
											disabled={this.isDisabled(Segment.dayOfWeek, Mode.AND)}
											checked={this.inSpecificsList(item.value, Mode.AND, Segment.dayOfWeek)}
											onChange={() => this.toggleSpecifics(item.value, Mode.AND, Segment.dayOfWeek)} />
		
										<label
											className={this.genClassName(['form-check-label'], ['c-and-weekday-item-label'])}
											htmlFor={this.genId(Mode.AND, Segment.dayOfWeek + item.value)}>
											{item.label}
										</label>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className={this.genClassName(['form-group'], ['c-and-monthday'])}>
					<div className={this.genClassName(['form-check'], ['c-and-monthday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-and-monthday-option'])}
							type="radio"
							id={this.genId(Mode.AND, Segment.dayOfMonth)}
							value={Mode.INCREMENT}
							checked={this.state.dayOfMonth.selected === Mode.AND}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.AND, Segment.dayOfMonth, Segment.dayOfWeek)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-and-monthday-option-label'])}
							htmlFor={this.genId(Mode.AND, Segment.dayOfMonth)}>

							Specific day of month (choose one or many)
						</label>
					</div>

					<div className={this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-monthday-list'])}>
						{this.state.daysOfMonth.map(item => {
							return (
								<div
									className={this.genClassName(['col-1'], ['c-and-monthday-item'])}
									item-value={item.value}
									key={item.value}>
		
									<div className={this.genClassName(['form-check'], ['c-and-monthday-item-check'])}>
										<input
											className={this.genClassName(['form-check-input'], ['c-and-monthday-item-field'])}
											type="checkbox"
											id={this.genId(Mode.AND, Segment.dayOfMonth + item.value)}
											value={item.value}
											disabled={this.isDisabled(Segment.dayOfMonth, Mode.AND)}
											checked={this.inSpecificsList(item.value, Mode.AND, Segment.dayOfMonth)}
											onChange={() => this.toggleSpecifics(item.value, Mode.AND, Segment.dayOfMonth)} />
		
										<label
											className={this.genClassName(['form-check-label'], ['c-and-monthday-item-label'])}
											htmlFor={this.genId(Mode.AND, Segment.dayOfMonth + item.value)}>
											{item.label}
										</label>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className={this.genClassName(['form-group'], ['c-last-monthday'])}>
					<div className={this.genClassName(['form-check'], ['c-last-monthday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-last-monthday-option'])}
							type="radio"
							id={this.genId(Mode.LAST_DAY, Segment.dayOfMonth)}
							value={Mode.LAST_DAY}
							checked={this.state.dayOfMonth.selected === Mode.LAST_DAY}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.LAST_DAY, Segment.dayOfMonth, Segment.dayOfWeek, 'L')} />

						<label
							className={this.genClassName(['form-check-label'], ['c-last-monthday-option-label'])}
							htmlFor={this.genId(Mode.LAST_DAY, Segment.dayOfMonth)}>

							On the last day of the month
						</label>
					</div>
				</div>

				<div className={this.genClassName(['form-group'], ['c-last-weekday'])}>
					<div className={this.genClassName(['form-check'], ['c-last-weekday-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-last-weekday-option'])}
							type="radio"
							id={this.genId(Mode.LAST_DAY_WEEK, Segment.dayOfMonth)}
							value={Mode.LAST_DAY_WEEK}
							checked={this.state.dayOfMonth.selected === Mode.LAST_DAY_WEEK}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.LAST_DAY_WEEK, Segment.dayOfMonth, Segment.dayOfWeek, 'LW')} />

						<label
							className={this.genClassName(['form-check-label'], ['c-last-weekday-option-label'])}
							htmlFor={this.genId(Mode.LAST_DAY_WEEK, Segment.dayOfMonth)}>

							On the last weekday of the month
						</label>
					</div>
				</div>

				
				<div className={this.genClassName(['form-group', 'form-inline'], ['c-last-nth'])}>
					<div className={this.genClassName(['form-check'], ['c-last-nth-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-last-nth-option'])}
							type="radio"
							id={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}
							value={Mode.LAST_NTH_DAY_WEEK}
							checked={this.state.dayOfWeek.selected === Mode.LAST_NTH_DAY_WEEK}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, Segment.dayOfMonth)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-last-nth-option-label'])}
							htmlFor={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}>

							On the last
						</label>
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-last-nth-weekday'])}
						disabled={this.isDisabled(Segment.dayOfWeek, Mode.LAST_NTH_DAY_WEEK)}
						value={this.getModelValues(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)[0]}
						onChange={(e) => this.setInValue(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek, 0, e.target.value)}>

						{this.state.daysOfWeek.map(item => {
							return (
								<option
									value={item.value + 'L'}
									key={item.value + 'L'}>
									{item.label}
								</option>
							);
						})}
					</select>

					<label
						className="c-last-nth-option-label2"
						htmlFor={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}>
						of the month
					</label>
				</div>

				<div className={this.genClassName(['form-group', 'form-inline'], ['c-day-before-end'])}>
					<div className={this.genClassName(['form-check'], ['c-day-before-end-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-day-before-end-option'])}
							type="radio"
							id={this.genId(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)}
							value={Mode.DAYS_BEFORE_END_MONTH}
							checked={this.state.dayOfMonth.selected === Mode.DAYS_BEFORE_END_MONTH}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, Segment.dayOfWeek)} />
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-day-before-end-monthday'])}
						disabled={this.isDisabled(Segment.dayOfMonth, Mode.DAYS_BEFORE_END_MONTH)}
						value={this.getModelValues(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)[0]}
						onChange={(e) => this.setInValue(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth, 0, e.target.value)}>

						{this.state.daysOfMonth.map(item => {
							return (
								<option
									value={'L-' + item.value}
									key={'L-' + item.value}>
									{item.label}
								</option>
							);
						})}
					</select>

					<label
						className="c-day-before-end-option-label"
						htmlFor={this.genId(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)}>
						day(s) before the end of the month
					</label>
				</div>

				<div className={this.genClassName(['form-group', 'form-inline'], ['c-nearest'])}>
					<div className={this.genClassName(['form-check'], ['c-nearest-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-nearest-option'])}
							type="radio"
							id={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}
							value={Mode.NEAREST_WEEKDAY_OF_MONTH}
							checked={this.state.dayOfMonth.selected === Mode.NEAREST_WEEKDAY_OF_MONTH}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, Segment.dayOfWeek)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-nearest-option-label'])}
							htmlFor={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}>

							Nearest weekday (Monday to Friday) to the
						</label>
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nearest-monthday'])}
						disabled={this.isDisabled(Segment.dayOfMonth, Mode.NEAREST_WEEKDAY_OF_MONTH)}
						value={this.getModelValues(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)[0]}
						onChange={(e) => this.setInValue(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth, 0, e.target.value)}>

						{this.state.daysOfMonthEvery.map(item => {
							return (
								<option
									key={item.value + 'W'}
									value={item.value + 'W'}>
									{item.label}
								</option>
							);
						})}
					</select>

					<label
						className="c-nearest-option-label2"
						htmlFor={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}>
						of the month
					</label>
				</div>

				<div className={this.genClassName(['form-group', 'form-inline'], ['c-nth'])}>
					<div className={this.genClassName(['form-check'], ['c-nth-check'])}>
						<input
							className={this.genClassName(['form-check-input'], ['c-nth-option'])}
							type="radio"
							id={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}
							value={Mode.NTH_WEEKDAY_OF_MONTH}
							checked={this.state.dayOfWeek.selected === Mode.NTH_WEEKDAY_OF_MONTH}
							disabled={this.isDisabled()}
							onChange={() => this.setSelected(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, Segment.dayOfMonth)} />

						<label
							className={this.genClassName(['form-check-label'], ['c-nth-option-label'])}
							htmlFor={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}>

							On the
						</label>
					</div>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every'])}
						disabled={this.isDisabled(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)}
						value={this.getModelValues(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)[1]}
						onChange={(e) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 1, e.target.value)}>

						{this.state.limitedDaysOfMonth.map(item => {
							return (
								<option
									value={item.value}
									key={item.value}>
									{item.label}
								</option>
							);
						})}
					</select>

					<select
						className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every-weekday'])}
						disabled={this.isDisabled(Segment.dayOfWeek, Mode.NTH_WEEKDAY_OF_MONTH)}
						value={this.getModelValues(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)[0]}
						onChange={(e) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek, 0, e.target.value)}>

						{this.state.daysOfWeek.map(item => {
							return (
								<option
									key={item.value}
									value={item.value}>
									{item.label}
								</option>
							);
						})}
					</select>

					<label
						className="c-nth-option-label2"
						htmlFor={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}>
						of the month
					</label>
				</div>
			</div>
		);
	}

	protected applyChanges() {
		const dayOfMonth = this.getQuartzCron().getView(Segment.dayOfMonth);
		const dayOfWeek = this.getQuartzCron().getView(Segment.dayOfWeek);
		this.setState({
			dayOfMonth,
			dayOfWeek
		});
		super.applyChanges();
	}

	private setEvery() {
		const dayOfMonth = this.getQuartzCron().getView(Segment.dayOfMonth);
		dayOfMonth.values.NONE.values = ['?'];
		this.getQuartzCron().setView(Segment.dayOfMonth, dayOfMonth);
		const dayOfWeek = this.getQuartzCron().getView(Segment.dayOfWeek);
		dayOfWeek.values.EVERY.values = ['*'];
		dayOfWeek.selected = Mode.EVERY;
		this.getQuartzCron().setView(Segment.dayOfWeek, dayOfWeek);
		this.applyChanges();
	}

	private setSelected(mode: Mode, segment: TabSegments, reset?: TabSegments, value?: string) {
		const view = this.getQuartzCron().getView(segment);
		view.selected = mode;
		this.getQuartzCron().setView(segment, view);

		if (reset === Segment.dayOfMonth) {
			this.resets.daysOfMonth();
		}
		if (reset === Segment.dayOfWeek) {
			this.resets.daysOfWeek();
		}
		if (value) {
			this.setInValue(mode, segment, 0, value);
		}
		this.applyChanges();
	}

	private isDisabled(segment?: TabSegments, mode?: Mode) {
		let disabled = this.props.disabled;
		if (segment && mode) {
			disabled = disabled || this.state[segment].selected !== mode;
		}
		return disabled;
	}

	private setInValue(mode: Mode, segment: TabSegments, index: 0|1, value: string) {
		const view = this.getQuartzCron().getView(segment);
		const values = view.values[mode].values;
		values[index] = value;
		this.getQuartzCron().setView(segment, view);
		this.applyChanges();
	}

	private getModelValues(mode: Mode, segment: TabSegments) {
		return this.state[segment].values[mode].values;
	}

	private inSpecificsList(value: string, mode: Mode, segment: TabSegments) {
		return this.getQuartzCron().hasValue(value, segment, mode);
	}

	private toggleSpecifics(value: string, mode: Mode, segment: TabSegments) {
		const view = this.getQuartzCron().getView(segment);
		const values = view.values[mode].values;
		if (!~values.indexOf(value)) {
			values.push(value);
			this.applyChanges();
			return;
		}

		const i = values.indexOf(value);
		values.splice(i, 1);
		this.getQuartzCron().setView(segment, view);
		this.applyChanges();
	}

	private getQuartzCron() {
		return QuartzCronDI.get(this.props.session);
	}
}
