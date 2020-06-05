import React from 'react';
import { Mode, Segment, ViewDataItem } from '@sbzen/cron-core';

import { CronBaseComponent, CronBaseProps } from '../cron-base.abstract';

export type TabBaseProps = {
	disabled: boolean,
	onChange: () => void,
	session: number
} & CronBaseProps;

export type TabBaseState<T extends keyof typeof Segment> = {
	[key in T]?: ViewDataItem;
};

export abstract class TabBaseComponent<P extends TabBaseProps, S extends TabBaseState<Segments>, Segments extends Segment> extends CronBaseComponent<P, S> {
	private sessionId = Date.now().toString();

	constructor(
		props: P,
		protected segments: Segments[]
	) {
		super(props, props.session);
	}

	protected genId(mode: Mode, extra?: string) {
		return `${mode}-${extra}${this.sessionId}`;
	}

	protected inSpecificsList(value: string, mode: Mode, segment: Segments) {
		return this.getQuartzCron().hasValue(value, segment, mode);
	}

	protected applyChanges() {
		const newState: TabBaseState<Segments> = {};
		this.segments.forEach(s => {
			newState[s] = this.getView(s);
		});
		this.setState({
			...this.state,
			...newState
		});
		this.props.onChange();
	}

	protected setInValue(mode: Mode, index: 0|1, value: string, segment: Segments) {
		const view = this.getView(segment);
		const values = view.values[mode].values;
		values[index] = value;
		this.setView(segment, view);
		this.applyChanges();
	}

	protected isDisabled(mode?: Mode, segment?: Segments) {
		let disabled = this.props.disabled;
		if (segment && mode) {
			const view = this.getView(segment);
			disabled = disabled || view.selected !== mode;
		}
		return disabled;
	}

	protected getValues(mode: Mode, segment: Segments) {
		return this.getQuartzCron().getValues(segment, mode);
	}

	protected getView(segment: Segments) {
		return this.getQuartzCron().getView(segment);
	}

	protected setView(segment: Segments, view: ViewDataItem) {
		return this.getQuartzCron().setView(segment, view);
	}

	protected toggleSpecifics(value: string, mode: Mode, segment: Segments) {
		const view = this.getView(segment);
		const values = view.values[mode].values;
		const isRemoving = !!~values.indexOf(value);
		if (isRemoving && values.length === 1) {
			this.applyChanges();
			return;
		}

		if (isRemoving) {
			const i = values.indexOf(value);
			values.splice(i, 1);
		} else {
			values.push(value);
		}
		this.setView(segment, view);
		this.applyChanges();
	}
}
