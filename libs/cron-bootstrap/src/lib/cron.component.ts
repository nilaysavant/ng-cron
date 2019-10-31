import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Type, Segment, CoreService } from '@sbzen/core';

import { tabs } from './tabs/tabs';
import { CronBootstrapService } from './cron.service';

@Component({
  selector: 'cron-bootstrap',
  templateUrl: './cron.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CronBootstrapService,
    CoreService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CronBootstrapComponent),
      multi: true
    }
  ]
})
export class CronBootstrapComponent implements ControlValueAccessor {
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

  constructor(private cronBootstrap: CronBootstrapService) {}

  getView(segment: Segment) {
    return this.cronBootstrap.getView(segment);
  }

  writeValue(cronValue: string) {
    this.cronBootstrap.fillFromExpression(cronValue);

    if (this.onChange) {
      this.applyChanges();
    }
  }

  registerOnChange(fn: (cronValue: string) => {}) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  applyChanges() {
    const str = this.cronBootstrap.toString();
    this.onChange(str);
  }
}
