import { Component, forwardRef, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Type, Segment, CoreService } from '@sbzen/uicron-core';

import { tabs } from './tabs/tabs';
import { UiCronService } from './ui.service';

@Component({
  selector: 'ui-cron',
  templateUrl: './ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UiCronService,
    CoreService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCronComponent),
      multi: true
    }
  ]
})
export class UiCronComponent implements ControlValueAccessor {
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = value != null && `${value}` !== 'false';
  }

  private onChange: (cronValue: string) => {};
  private isDisabled = false;

  type = Type;
  segment = Segment;
  tabs = tabs;
  tab = this.tabs[0];

  constructor(private uiCronService: UiCronService) {}

  getView(segment: Segment) {
    return this.uiCronService.getView(segment);
  }

  writeValue(cronValue: string) {
    this.uiCronService.fillFromExpression(cronValue);

    if (this.onChange) {
      this.applyChanges();
    }
  }

  registerOnChange(fn: (cronValue: string) => {}) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  applyChanges() {
    const str = this.uiCronService.toString();
    this.onChange(str);
  }
}
