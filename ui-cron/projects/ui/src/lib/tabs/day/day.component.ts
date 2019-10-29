import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Mode, Segment, ViewDataItem, CoreService } from '@sbzen/uicron-core';

import { UiCronService } from './../../ui.service';
import { UiTabBaseComponent } from './../tab-base.component';

type TabSegments = Segment.dayOfMonth|Segment.dayOfWeek;

@Component({
  selector: 'ui-cron-day',
  templateUrl: './day.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiDayComponent extends UiTabBaseComponent {
  @Input() dayOfMonth: ViewDataItem;
  @Input() dayOfWeek: ViewDataItem;

  mode = Mode;
  segment = Segment;
  daysOfWeekEvery = this.coreService.getList(Segment.dayOfWeek, true);
  daysOfWeek = this.coreService.getList(Segment.dayOfWeek);
  daysOfWeekCodes = this.coreService.getDaysOfWeekCodes();

  daysOfMonthEvery = this.coreService.getList(Segment.dayOfMonth, true);
  daysOfMonth = this.coreService.getList(Segment.dayOfMonth);
  limitedDaysOfMonth = this.daysOfMonthEvery.slice(0, 5);

  resets = {
    daysOfMonth: () => {
      this.dayOfMonth.selected = Mode.NONE;
      this.dayOfMonth.values.NONE.values = ['?'];
    },
    daysOfWeek: () => {
      this.dayOfWeek.selected = Mode.NONE;
      this.dayOfWeek.values.NONE.values = ['?'];
    }
  };

  constructor(
    private coreService: CoreService,
    private uiCronService: UiCronService
  ) {
    super();
  }

  setEvery() {
    this.dayOfMonth.values.NONE.values = ['?'];
    this.dayOfWeek.values.EVERY.values = ['*'];
    this.dayOfWeek.selected = Mode.EVERY;
    this.applyChanges();
  }

  setSelected(mode: Mode, segment: TabSegments, reset?: TabSegments, value?: string) {
    this[segment].selected = mode;
    if (reset === Segment.dayOfMonth) {
      this.resets.daysOfMonth();
    }
    if (reset === Segment.dayOfWeek) {
      this.resets.daysOfWeek();
    }
    if (value) {
      this.setInValue(mode, segment, 0, value);
    }
    this.applyChanges();
  }

  isDisabled(segment?: TabSegments, mode?: Mode) {
    let disabled = this.disableFields;
    if (segment && mode) {
      disabled = disabled || this[segment].selected !== mode;
    }
    return disabled;
  }

  setInValue(mode: Mode, segment: TabSegments, index: 0|1, value: string) {
    const source = this.getModelValues(mode, segment);
    source[index] = value;
    this.applyChanges();
  }

  getModelValues(mode: Mode, segment: TabSegments) {
    return this[segment].values[mode].values;
  }

  inSpecificsList(value: string, mode: Mode, segment: TabSegments) {
    return this.uiCronService.hasValue(value, segment, mode);
  }

  toggleSpecifics(value: string, mode: Mode, segment: TabSegments) {
    const values = this.uiCronService.getValues(segment, mode);
    if (!values.includes(value)) {
      values.push(value);
      this.applyChanges();
      return;
    }

    const i = values.indexOf(value);
    values.splice(i, 1);
    this.applyChanges();
  }
}
