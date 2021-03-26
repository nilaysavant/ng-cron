import React from 'react';
import { Segment, QuartzService, Mode, ViewDataItem, CronJobsSelectOption } from '@sbzen/cron-core';

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
		const coreService = new QuartzService();
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
				{this.genDayOfMonthLastDay()}
				{this.genDayOfMonthLastDayWeek()}
				{this.genDayOfWeekLastNTHDayWeek()}
				{this.genDayOfMonthDaysBeforeEndMonth()}
				{this.genDayOfMonthNearestWeekDayOfMonth()}
				{this.genDayOfWeekNTHWeekDayOfMonth()}
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

						{this.props.localization.quartz.day.every.label}
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

						{this.props.localization.quartz.day.dayOfWeekIncrement.label1}
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
					{this.props.localization.quartz.day.dayOfWeekIncrement.label2}
				</label>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-from'])}
					disabled={this.isDisabled(Mode.INCREMENT, Segment.dayOfWeek)}
					value={this.getValues(Mode.INCREMENT, Segment.dayOfWeek)[0]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 0, e.target.value, Segment.dayOfWeek)}>

					{this.state.daysOfWeek.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{this.props.localization.common.dayOfWeek[item.label.toLowerCase()]}
							</option>
						);
					})}
				</select>
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
						{this.props.localization.quartz.day.dayOfMonthIncrement.label1}
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
					{this.props.localization.quartz.day.dayOfMonthIncrement.label2}
				</label>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-from'])}
					disabled={this.isDisabled(Mode.INCREMENT, Segment.dayOfMonth)}
					value={this.getValues(Mode.INCREMENT, Segment.dayOfMonth)[0]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 0, e.target.value, Segment.dayOfMonth)}>

					{this.state.daysOfMonthEvery.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{this.props.localization.common.dayOfMonth[item.label]}
							</option>
						);
					})}
				</select>

				<label
					className="c-increment-monthday-option-label3"
					htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
					{this.props.localization.quartz.day.dayOfMonthIncrement.label3}
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
						{this.props.localization.quartz.day.dayOfWeekAnd.label}
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
						{this.props.localization.quartz.day.dayOfMonthAnd.label}
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

	private genDayOfMonthLastDay() {
		return (
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
						{this.props.localization.quartz.day.dayOfMonthLastDay.label}
					</label>
				</div>
			</div>
		);
	}

	private genDayOfMonthLastDayWeek() {
		return (
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
						{this.props.localization.quartz.day.dayOfMonthLastDayWeek.label}
					</label>
				</div>
			</div>
		);
	}

	private genDayOfWeekLastNTHDayWeek() {
		return (
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

						{this.props.localization.quartz.day.dayOfWeekLastNTHDayWeek.label1}
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-last-nth-weekday'])}
					disabled={this.isDisabled(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}
					value={this.getValues(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)[0]}
					onChange={(e) => this.setInValue(Mode.LAST_NTH_DAY_WEEK, 0, e.target.value, Segment.dayOfWeek)}>

					{this.state.daysOfWeek.map(item => {
						return (
							<option
								value={item.value + 'L'}
								key={item.value + 'L'}>
								{this.props.localization.common.dayOfWeek[item.label.toLowerCase()]}
							</option>
						);
					})}
				</select>

				<label
					className="c-last-nth-option-label2"
					htmlFor={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}>
					{this.props.localization.quartz.day.dayOfWeekLastNTHDayWeek.label2}
				</label>
			</div>
		);
	}

	private genDayOfMonthDaysBeforeEndMonth() {
		return (
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
					disabled={this.isDisabled(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)}
					value={this.getValues(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)[0]}
					onChange={(e) => this.setInValue(Mode.DAYS_BEFORE_END_MONTH, 0, e.target.value, Segment.dayOfMonth)}>

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
					{this.props.localization.quartz.day.dayOfMonthDaysBeforeEndMonth.label}
				</label>
			</div>
		);
	}

	private genDayOfMonthNearestWeekDayOfMonth() {
		return (
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
						{this.props.localization.quartz.day.dayOfMonthNearestWeekDayOfMonth.label1}
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nearest-monthday'])}
					disabled={this.isDisabled(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}
					value={this.getValues(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)[0]}
					onChange={(e) => this.setInValue(Mode.NEAREST_WEEKDAY_OF_MONTH, 0, e.target.value, Segment.dayOfMonth)}>

					{this.state.daysOfMonthEvery.map(item => {
						return (
							<option
								key={item.value + 'W'}
								value={item.value + 'W'}>
								{this.props.localization.common.dayOfMonth[item.label]}
							</option>
						);
					})}
				</select>

				<label
					className="c-nearest-option-label2"
					htmlFor={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}>
					{this.props.localization.quartz.day.dayOfMonthNearestWeekDayOfMonth.label2}
				</label>
			</div>
		);
	}

	private genDayOfWeekNTHWeekDayOfMonth() {
		return (
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
						{this.props.localization.quartz.day.dayOfWeekNTHWeekDayOfMonth.label1}
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every'])}
					disabled={this.isDisabled(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}
					value={this.getValues(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)[1]}
					onChange={(e) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 1, e.target.value, Segment.dayOfWeek)}>

					{this.state.limitedDaysOfMonth.map(item => {
						return (
							<option
								value={item.value}
								key={item.value}>
								{this.props.localization.common.dayOfMonth[item.label]}
							</option>
						);
					})}
				</select>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every-weekday'])}
					disabled={this.isDisabled(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}
					value={this.getValues(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)[0]}
					onChange={(e) => this.setInValue(Mode.NTH_WEEKDAY_OF_MONTH, 0, e.target.value, Segment.dayOfWeek)}>

					{this.state.daysOfWeek.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{this.props.localization.common.dayOfWeek[item.label.toLowerCase()]}
							</option>
						);
					})}
				</select>

				<label
					className="c-nth-option-label2"
					htmlFor={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}>
					{this.props.localization.quartz.day.dayOfWeekNTHWeekDayOfMonth.label2}
				</label>
			</div>
		);
	}

	private setEvery() {
		const dayOfMonth = this.getView(Segment.dayOfMonth);
		dayOfMonth.values.NONE.values = ['?'];
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
		dayOfMonth.values.NONE.values = ['?'];
		this.setView(Segment.dayOfMonth, dayOfMonth);
	}

	private resetDaysOfWeek() {
		const dayOfWeek = this.getView(Segment.dayOfWeek);
		dayOfWeek.selected = Mode.NONE;
		dayOfWeek.values.NONE.values = ['?'];
		this.setView(Segment.dayOfWeek, dayOfWeek);
	}
}
