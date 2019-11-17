import { ValueModel } from './value.model';
import { Mode } from './mode.enum';

export class DataModel {
	seconds = new ValueModel();
	minutes = new ValueModel();
	hours = new ValueModel();
	dayOfMonth = new ValueModel();
	month = new ValueModel();
	dayOfWeek = new ValueModel();
	year = new ValueModel({
		values: ['*'],
		mode: Mode.EVERY
	});

	constructor(d?: DataModel) {
		if (!d) {
			return;
		}
		this.seconds = new ValueModel(d.seconds);
		this.minutes = new ValueModel(d.minutes);
		this.hours = new ValueModel(d.hours);
		this.dayOfMonth = new ValueModel(d.dayOfMonth);
		this.month = new ValueModel(d.month);
		this.dayOfWeek = new ValueModel(d.dayOfWeek);
		this.year = new ValueModel(d.year);
	}
}
