import { Mode, ModeUtils } from './mode.enum';
import { DataModel } from './data.model';
import { Segment } from './segment.enum';
import { ValueModel } from './value.model';

import { CoreService } from './core.service';

export class UnixService extends CoreService {
	toModel(expression?: string) {
		const model = new DataModel();
		if (!expression) {
			model.dayOfMonth.values = ['*'];
			model.hours.mode = Mode.AND;
			model.hours.values = ['0'];
			model.minutes.mode = Mode.AND;
			model.minutes.values = ['0'];
			return model;
		}
		const keys: Segment[] = [
			Segment.minutes,
			Segment.hours,
			Segment.dayOfMonth,
			Segment.month,
			Segment.dayOfWeek
		];
		expression
			.split(' ')
			.slice(0, keys.length)
			.forEach((s, i) => {
				const key = keys[i];
				const v = this.parseSegment(s, key);
				model[key] = v;
			});
		return model;
	}

	stringifySegment(v: ValueModel) {
		const mode = v.mode;
		if (ModeUtils.containsSeparator(mode)) {
			const values = [...v.values];
			if (mode === Mode.INCREMENT) {
				values[0] = '*';
			}
			return values.join(ModeUtils.getSeparator(mode));
		}
		return v.values.join('');
	}

	toString(model: DataModel) {
		const values = [
			this.stringifySegment(model.minutes),
			this.stringifySegment(model.hours),
			this.stringifySegment(model.dayOfMonth),
			this.stringifySegment(model.month),
			this.stringifySegment(model.dayOfWeek)
		];
		return values.join(' ');
	}
}
