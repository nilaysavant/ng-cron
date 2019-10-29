import { EventEmitter, Output, Input } from '@angular/core';

import { Mode } from '@sbzen/uicron-core';

export abstract class UiTabBaseComponent {
  @Output() changed = new EventEmitter<never>();

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
    console.log('base applyChanges()');
    this.changed.emit();
  }
}
