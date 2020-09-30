import { Directive, Input, ChangeDetectorRef } from '@angular/core';

import { ViewDataItem, Mode, Segment } from '@sbzen/cron-core';

import { QuartzCronService } from './../cron.service';
import { TabBaseComponent } from './tab-base.component';

@Directive()
export abstract class TabSingleSegmentComponent extends TabBaseComponent {
	@Input() view: ViewDataItem;

	mode = Mode;

	constructor(
		private segment: Segment,
		protected quartzCron: QuartzCronService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	setEvery() {
		this.view.values.EVERY.values = ['*'];
		this.setSelected(Mode.EVERY);
	}

	setSelected(mode: Mode) {
		this.view.selected = mode;
		this.applyChanges();
		this.cd.detectChanges();
	}

	setInValue(mode: Mode, index: 0|1, value: string) {
		const source = this.getModelValues(mode);
		source[index] = value;
		this.applyChanges();
		this.cd.detectChanges();
	}

	getModelValues(mode: Mode) {
		return this.view.values[mode].values;
	}

	inSpecificsList(value: string, mode: Mode) {
		return this.quartzCron.hasValue(value, this.segment, mode);
	}

	handleSpecificsChange(e: Event, value: string, mode: Mode) {
		const values = this.quartzCron.getValues(this.segment, mode);
		const isRemoving = !!~values.indexOf(value);
		if (isRemoving && values.length === 1) {
			e.preventDefault();
			return;
		}
	}

	toggleSpecifics(value: string, mode: Mode) {
		const values = this.quartzCron.getValues(this.segment, mode);
		const isRemoving = !!~values.indexOf(value);

		if (!isRemoving) {
			values.push(value);
			this.applyChanges();
			this.cd.detectChanges();
			return;
		}

		const i = values.indexOf(value);
		values.splice(i, 1);
		this.applyChanges();
		this.cd.detectChanges();
	}

	isDisabled(mode?: Mode) {
		return this.disableFields || (mode && this.view.selected !== mode);
	}
}
