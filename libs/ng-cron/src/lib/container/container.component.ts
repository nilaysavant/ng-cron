import { Component, ContentChild, TemplateRef, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Type } from '@sbzen/cron-core';

import { CronLocalization } from './../cron-localization';

@Component({
	selector: 'cron-container',
	templateUrl: './container.html',
	styleUrls: ['./container.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CronContainerComponent {
	@ContentChild('content') content: TemplateRef<HTMLDivElement>;
	@ViewChildren('tabEl', { read: ElementRef }) tabEls: QueryList<ElementRef>|null = null;
	@Output() tabChanged = new EventEmitter<Type>();
	@Input() localization: CronLocalization|undefined = undefined;
	@Input() cssClassPrefix = '';
	@Input() hostClass = '';
	@Input() activeTab = Type.MINUTES;
	@Input() tabs: Type[] = [];
	@Input() hideTabs = false;

	constructor(private readonly cd: ChangeDetectorRef) {}

	navigateTab(code: string, tab: Type) {
		if (!this.tabEls || code !== 'ArrowRight' && code !== 'ArrowLeft') {
			return;
		}
		const tabEls = this.tabEls.toArray().map(er => er.nativeElement);
		const tabs = this.tabs;
		const pos = tabs.indexOf(tab);
		let toPos = 0;

		if (code === 'ArrowRight') {
			const nextPos = pos + 1;
			toPos = (nextPos === tabs.length) ? 0 : nextPos;
		}
		if (code === 'ArrowLeft') {
			const prevPos = pos - 1;
			toPos = (prevPos < 0) ? tabs.length - 1 : prevPos;
		}

		this.setTab(tabs[toPos]);
		const tabEl = tabEls[toPos];
		if (tabEl) {
			tabEl.focus();
			this.cd.detectChanges();
		}
	}

	setTab(tab: Type) {
		this.activeTab = tab;
		this.cd.detectChanges();
		this.tabChanged.emit(tab);
	}
}
