import React from 'react';
import { Mode, Segment } from '@sbzen/cron-core';

import { TabBaseComponent, TabBaseProps, TabBaseState } from './tab-base.abstract';

export abstract class TabSingleSegmentComponent<S extends TabBaseState<SingleSegment>, SingleSegment extends Segment> extends TabBaseComponent<TabBaseProps, S, SingleSegment> {
	protected abstract genEvery(): JSX.Element;
	protected abstract genIncrement(): JSX.Element;
	protected abstract genAnd(): JSX.Element;
	protected abstract genRange(): JSX.Element;

	constructor(
		props: TabBaseProps,
		protected segment: SingleSegment
	) {
		super(props, [segment]);
	}

	render() {
		return (
			<div>
				{this.genEvery()}
				{this.genIncrement()}
				{this.genAnd()}
				{this.genRange()}
			</div>
		);
	}

	protected setEvery() {
		const view = this.getView(this.segment);
		view.values.EVERY.values = ['*'];
		this.setView(this.segment, view);
		this.setSelected(Mode.EVERY);
	}

	protected setSelected(mode: Mode) {
		const view = this.getView(this.segment);
		view.selected = mode;
		this.setView(this.segment, view);
		this.applyChanges();
	}

	protected setInValue(mode: Mode, index: 0|1, value: string) {
		super.setInValue(mode, index, value, this.segment)
	}

	protected inSpecificsList(value: string, mode: Mode) {
		return super.inSpecificsList(value, mode, this.segment);
	}

	protected getValues(mode: Mode) {
		return super.getValues(mode, this.segment)
	}

	protected toggleSpecifics(value: string, mode: Mode) {
		super.toggleSpecifics(value, mode, this.segment);
	}

	protected isDisabled(mode?: Mode) {
		return super.isDisabled(mode, this.segment);
	}
}
