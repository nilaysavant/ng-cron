import { Component, forwardRef, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Type, Segment, CoreService } from '@sbzen/core';

import { tabs } from './tabs/tabs';
import { QuartzCronService } from './cron.service';

@Component({
	selector: 'quartz-cron',
	templateUrl: './cron.html',
	styleUrls: ['./cron.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		QuartzCronService,
		CoreService,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => QuartzCronComponent),
			multi: true
		}
	]
})
export class QuartzCronComponent implements ControlValueAccessor {
	@ViewChildren('tabEl', { read: ElementRef }) tabEls: QueryList<ElementRef>;
	@Output() changed = new EventEmitter<string>();
	@Input() cssClassPrefix = '';
	@Input()
	get disabled(): boolean {
		return this.isDisabled;
	}
	set disabled(value) {
		this.isDisabled = value != null && `${value}` !== 'false';
	}

	private onChange: (cronValue: string) => {};
	private onTouched: () => {};
	private isDisabled = false;

	type = Type;
	segment = Segment;
	tabs = tabs;
	tab = this.tabs[0];

	constructor(private quartzCron: QuartzCronService) {}

	navigateTab(code: string, type: Type) {
		if (code !== 'ArrowRight' && code !== 'ArrowLeft') {
			return;
		}
		const tabEls = this.tabEls.toArray().map(er => er.nativeElement);
		const pos = this.tabs.map(t => t.type).indexOf(type);
		let toPos = 0;

		if (code === 'ArrowRight') {
			const nextPos = pos + 1;
			toPos = (nextPos === this.tabs.length) ? 0 : nextPos;
		}
		if (code === 'ArrowLeft') {
			const prevPos = pos - 1;
			toPos = (prevPos < 0) ? this.tabs.length - 1 : prevPos;
		}

		this.tab = this.tabs[toPos];
		tabEls[toPos].focus();
	}

	getView(segment: Segment) {
		return this.quartzCron.getView(segment);
	}

	writeValue(cronValue: string) {
		this.quartzCron.fillFromExpression(cronValue);
	}

	registerOnChange(fn: (cronValue: string) => {}) {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => {}) {
		this.onTouched = fn;
	}

	applyChanges() {
		const str = this.quartzCron.toString();
		if (this.onChange) {
			this.onChange(str);
		}
		if (this.onTouched) {
			this.onTouched();
		}
		this.changed.emit(str);
	}
}
