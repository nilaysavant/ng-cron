import { Mode } from './mode.enum';
import { Segment } from './segment.enum';
import { ValueModel } from './value.model';

export type ViewDataItem = {
	selected: Mode,
	values: {
		[key in Mode]?: ValueModel
	}
};

export type ViewData = {
	[key in Segment]: ViewDataItem
};
