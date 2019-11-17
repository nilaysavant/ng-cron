import { ViewDataItem, Mode, Segment } from '@sbzen/cron-core';

import { QuartzCronDI } from './../cron-di';

import { TabBaseComponent, TabBaseProps } from './tab-base.component';

export type TabSingleSegmentState = {
	view: ViewDataItem
};

export abstract class TabSingleSegmentComponent<S extends TabSingleSegmentState> extends TabBaseComponent<TabBaseProps, S> {
	constructor(
		private segment: Segment,
		props: TabBaseProps
	) {
		super(props);
	}

	private getQuartzCron() {
		return QuartzCronDI.get(this.props.session);
	}

	protected setEvery() {
		const view = this.getQuartzCron().getView(this.segment);
		view.values.EVERY.values = ['*'];
		this.getQuartzCron().setView(this.segment, view);
		this.setSelected(Mode.EVERY);
	}

	protected setSelected(mode: Mode) {
		const view = this.getQuartzCron().getView(this.segment);
		view.selected = mode;
		this.getQuartzCron().setView(this.segment, view);
		this.applyChanges();
	}

	protected setInValue(mode: Mode, index: 0|1, value: string) {
		const source = this.getModelValues(mode);
		source[index] = value;
		this.applyChanges();
	}

	protected getModelValues(mode: Mode) {
		return this.state.view.values[mode].values;
	}

	protected inSpecificsList(value: string, mode: Mode) {
		return QuartzCronDI
			.get(this.props.session)
			.hasValue(value, this.segment, mode);
	}

	protected toggleSpecifics(value: string, mode: Mode) {
		const values = QuartzCronDI
			.get(this.props.session)
			.getValues(this.segment, mode);

		if (!~values.indexOf(value)) {
			values.push(value);
			this.applyChanges();
			return;
		}

		const i = values.indexOf(value);
		values.splice(i, 1);
		this.applyChanges();
	}

	protected isDisabled(mode?: Mode) {
		return this.props.disabled || (mode && this.state.view.selected !== mode);
	}

	protected applyChanges() {
		this.setState({
			view: QuartzCronDI.get(this.props.session).getView(this.segment)
		});
		super.applyChanges();
	}
}
