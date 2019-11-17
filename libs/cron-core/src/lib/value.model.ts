import { Mode } from './mode.enum';

export class ValueModel {
	values = ['*'];
	mode = Mode.EVERY;

	constructor(d?: ValueModel) {
		if (!d) {
			return;
		}
		this.values = d.values || ['*'];
		this.mode = d.mode;
	}
}
