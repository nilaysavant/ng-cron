import { Input, ChangeDetectorRef } from '@angular/core';

import { ViewDataItem, Mode, Segment } from '@sbzen/cron-core';

import { QuartzCronService } from './../cron.service';
import { TabBaseComponent } from './tab-base.component';

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
		this.cd.detectChanges();
		this.cd.detach();
		this.applyChanges();
	}

	setInValue(mode: Mode, index: 0|1, value: string) {
		const source = this.getModelValues(mode);
		source[index] = value;
		this.applyChanges();
	}

	getModelValues(mode: Mode) {
		return this.view.values[mode].values;
	}

	inSpecificsList(value: string, mode: Mode) {
		return this.quartzCron.hasValue(value, this.segment, mode);
	}

	toggleSpecifics(value: string, mode: Mode) {
		const values = this.quartzCron.getValues(this.segment, mode);
		if (!~values.indexOf(value)) {
			values.push(value);
			this.applyChanges();
			return;
		}

		const i = values.indexOf(value);
		values.splice(i, 1);
		this.applyChanges();
	}

	isDisabled(mode?: Mode) {
		return this.disableFields || (mode && this.view.selected !== mode);
	}
}
