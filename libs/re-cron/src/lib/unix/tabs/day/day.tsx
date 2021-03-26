import React from 'react';
import { Segment, UnixService, Mode, ViewDataItem, CronJobsSelectOption } from '@sbzen/cron-core';

import { TabBaseProps, TabBaseState, TabBaseComponent } from './../tab-base.abstract';

type TabSegments = Segment.dayOfMonth|Segment.dayOfWeek;

type ReCronDayState = {
	daysOfWeekEvery: CronJobsSelectOption[];
	daysOfWeek: CronJobsSelectOption[];
	daysOfWeekCodes: CronJobsSelectOption[];
	daysOfMonthEvery: CronJobsSelectOption[];
	daysOfMonth: CronJobsSelectOption[];
	limitedDaysOfMonth: CronJobsSelectOption[];
	dayOfMonth: ViewDataItem;
	dayOfWeek: ViewDataItem;
} & TabBaseState<TabSegments>;

export class ReCronDay extends TabBaseComponent<TabBaseProps, ReCronDayState, TabSegments> {
	constructor(props: TabBaseProps) {
		super(props, [Segment.dayOfMonth, Segment.dayOfWeek]);
		const coreService = new UnixService();
		const daysOfMonthEvery = coreService.getList(Segment.dayOfMonth, true);
		this.state = {
			daysOfWeekEvery: coreService.getList(Segment.dayOfWeek, true),
			daysOfWeek: coreService.getList(Segment.dayOfWeek),
			daysOfWeekCodes: coreService.getDaysOfWeekCodes(),
			daysOfMonthEvery: daysOfMonthEvery,
			daysOfMonth: coreService.getList(Segment.dayOfMonth),
			limitedDaysOfMonth: daysOfMonthEvery.slice(0, 5),
			dayOfMonth: this.getView(Segment.dayOfMonth),
			dayOfWeek: this.getView(Segment.dayOfWeek)
		};
	}

	render() {
		return (
			<div>
				{this.genEvery()}
				{this.genDayOfWeekIncrement()}
				{this.genDayOfMonthIncrement()}
				{this.genDayOfWeekAnd()}
				{this.genDayOfMonthAnd()}
			</div>
		);
	}

	private genEvery() {
		const isChecked = [
			this.state.dayOfWeek.selected === Mode.EVERY,
			this.state.dayOfMonth.selected !== Mode.INCREMENT,
			this.state.dayOfMonth.selected !== Mode.AND
		].every(r => !!r);

		return (
			<div className={this.genClassName(['form-group'], ['c-every-weekday'])}>
				<div className={this.genClassName(['form-check'], ['c-every-weekday-check'])}>
					<input
						className={this.genClassName(['form-check-input'], ['c-every-weekday-option'])}
						type="radio"
						id={this.genId(Mode.EVERY, Segment.dayOfWeek)}
						value={Mode.EVERY}
						checked={isChecked}
						disabled={this.isDisabled()}
						onChange={() => this.setEvery()} />

					<label
						className={this.genClassName(['form-check-label'], ['c-every-weekday-option-label'])}
						htmlFor={this.genId(Mode.EVERY, Segment.dayOfWeek)}>

						{this.props.localization.unix.day.every.label}
					</label>
				</div>
			</div>
		);
	}

	private genDayOfWeekIncrement() {
		return (
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

						{this.props.localization.unix.day.dayOfWeekIncrement.label1}
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-every'])}
					disabled={this.isDisabled(Mode.INCREMENT, Segment.dayOfWeek)}
					value={this.getValues(Mode.INCREMENT, Segment.dayOfWeek)[1]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 1, e.target.value, Segment.dayOfWeek)}>

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
					{this.props.localization.unix.day.dayOfWeekIncrement.label2}
				</label>
			</div>
		);
	}

	private genDayOfMonthIncrement() {
		return (
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
						{this.props.localization.unix.day.dayOfMonthIncrement.label1}
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-every'])}
					disabled={this.isDisabled(Mode.INCREMENT, Segment.dayOfMonth)}
					value={this.getValues(Mode.INCREMENT, Segment.dayOfMonth)[1]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 1, e.target.value, Segment.dayOfMonth)}>

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
					{this.props.localization.unix.day.dayOfMonthIncrement.label2}
				</label>
			</div>
		);
	}

	private genDayOfWeekAnd() {
		return (
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
						{this.props.localization.unix.day.dayOfWeekAnd.label}
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
										disabled={this.isDisabled(Mode.AND, Segment.dayOfWeek)}
										checked={this.inSpecificsList(item.value, Mode.AND, Segment.dayOfWeek)}
										onChange={() => this.toggleSpecifics(item.value, Mode.AND, Segment.dayOfWeek)} />

									<label
										className={this.genClassName(['form-check-label'], ['c-and-weekday-item-label'])}
										htmlFor={this.genId(Mode.AND, Segment.dayOfWeek + item.value)}>
										{this.props.localization.common.dayOfWeek[item.label.toLowerCase()]}
									</label>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	private genDayOfMonthAnd() {
		return (
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
						{this.props.localization.unix.day.dayOfMonthAnd.label}
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
										disabled={this.isDisabled(Mode.AND, Segment.dayOfMonth)}
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
		);
	}

	private setEvery() {
		const dayOfMonth = this.getView(Segment.dayOfMonth);
		dayOfMonth.values.NONE.values = ['*'];
		dayOfMonth.selected = Mode.NONE;
		this.setView(Segment.dayOfMonth, dayOfMonth);
		const dayOfWeek = this.getView(Segment.dayOfWeek);
		dayOfWeek.values.EVERY.values = ['*'];
		dayOfWeek.selected = Mode.EVERY;
		this.setView(Segment.dayOfWeek, dayOfWeek);
		this.applyChanges();
	}

	private setSelected(mode: Mode, segment: TabSegments, reset?: TabSegments, value?: string) {
		const view = this.getView(segment);
		view.selected = mode;
		this.setView(segment, view);

		if (reset === Segment.dayOfMonth) {
			this.resetsDaysOfMonth();
		}
		if (reset === Segment.dayOfWeek) {
			this.resetDaysOfWeek();
		}
		if (value) {
			this.setInValue(mode, 0, value, segment);
		}
		this.applyChanges();
	}

	private resetsDaysOfMonth() {
		const dayOfMonth = this.getView(Segment.dayOfMonth);
		dayOfMonth.selected = Mode.NONE;
		dayOfMonth.values.NONE.values = ['*'];
		this.setView(Segment.dayOfMonth, dayOfMonth);
	}

	private resetDaysOfWeek() {
		const dayOfWeek = this.getView(Segment.dayOfWeek);
		dayOfWeek.selected = Mode.NONE;
		dayOfWeek.values.NONE.values = ['*'];
		this.setView(Segment.dayOfWeek, dayOfWeek);
	}
}
