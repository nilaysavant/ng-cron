import { Input } from '@angular/core';

import { ViewDataItem, Mode, Segment } from '@sbzen/uicron-core';

import { UiCronService } from '../ui.service';
import { UiTabBaseComponent } from './tab-base.component';

export abstract class UiTabSingleSegmentComponent extends UiTabBaseComponent {
  @Input() view: ViewDataItem;

  mode = Mode;

  constructor(
    private segment: Segment,
    protected uiCronService: UiCronService
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
    return this.uiCronService.hasValue(value, this.segment, mode);
  }

  toggleSpecifics(value: string, mode: Mode) {
    const values = this.uiCronService.getValues(this.segment, mode);
    if (!values.includes(value)) {
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
