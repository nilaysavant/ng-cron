import { EventEmitter, Output, Input } from '@angular/core';

import { Mode } from '@sbzen/cron-core';

export abstract class TabBaseComponent {
	@Output() changed = new EventEmitter<never>();
	@Input() cssClassPrefix = '';

	@Input()
	get disabled(): boolean {
		return this.disableFields;
	}
	set disabled(value) {
		this.disableFields = value != null && `${value}` !== 'false';
	}

	protected disableFields = false;
	private sessionId = Date.now().toString();

	mode = Mode;

	genId(mode: Mode, extra?: string) {
		return `${mode}-${extra}${this.sessionId}`;
	}

	protected applyChanges() {
		this.changed.emit();
	}
}
