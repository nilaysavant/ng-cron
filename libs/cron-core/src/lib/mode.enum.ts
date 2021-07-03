import { Separator } from './separator.enum';

export enum Mode {
	AND = 'AND',
	RANGE = 'RANGE',
	INCREMENT = 'INCREMENT',
	NTH_WEEKDAY_OF_MONTH = 'NTH_WEEKDAY_OF_MONTH',
	EVERY = 'EVERY',
	LAST_DAY = 'LAST_DAY',
	LAST_DAY_WEEK = 'LAST_DAY_WEEK',
	LAST_NTH_DAY_WEEK = 'LAST_NTH_DAY_WEEK',
	DAYS_BEFORE_END_MONTH = 'DAYS_BEFORE_END_MONTH',
	NEAREST_WEEKDAY_OF_MONTH = 'NEAREST_WEEKDAY_OF_MONTH',
	NONE = 'NONE'
}

const separatorsMap = new Map<Mode, Separator>([
	[Mode.AND, Separator.AND],
	[Mode.RANGE, Separator.RANGE],
	[Mode.INCREMENT, Separator.INCREMENT],
	[Mode.NTH_WEEKDAY_OF_MONTH, Separator.NTH_WEEKDAY_OF_MONTH]
]);

export class ModeUtils {
	static getSeparator(mode: Mode) {
		return separatorsMap.get(mode);
	}

	static containsSeparator(mode: Mode) {
		return separatorsMap.has(mode);
	}

	static detect(str: string) {
		if (str.includes('L-')) {
			return Mode.DAYS_BEFORE_END_MONTH;
		}
		if (str.includes(Separator.AND)) {
			return Mode.AND;
		}
		if (str.includes(Separator.RANGE)) {
			return Mode.RANGE;
		}
		if (str === 'L') {
			return Mode.LAST_DAY;
		}
		if (str === 'LW') {
			return Mode.LAST_DAY_WEEK;
		}
		if (str.match(/[0-9]{1}L/i)) {
			return Mode.LAST_NTH_DAY_WEEK;
		}
		if (str.endsWith('W')) {
			return Mode.NEAREST_WEEKDAY_OF_MONTH;
		}
		if (str.includes(Separator.INCREMENT)) {
			return Mode.INCREMENT;
		}
		if (str.includes(Separator.NTH_WEEKDAY_OF_MONTH)) {
			return Mode.NTH_WEEKDAY_OF_MONTH;
		}
		if (str.includes('*')) {
			return Mode.EVERY;
		}
		if (str === '?') {
			return Mode.NONE;
		}
		return Mode.AND;
	}

	static parseToValues(str: string, mode: Mode) {
		const defaultValue = [str];
		if (Mode.DAYS_BEFORE_END_MONTH === mode) {
			return defaultValue;
		}
		if (Mode.INCREMENT === mode) {
			return str.split(Separator.INCREMENT);
		}
		if (Mode.AND === mode) {
			return str.split(Separator.AND).filter(value => !!value);
		}
		if (Mode.RANGE === mode) {
			return str.split(Separator.RANGE);
		}
		if (Mode.LAST_DAY === mode) {
			return defaultValue;
		}
		if (Mode.LAST_DAY_WEEK === mode) {
			return defaultValue;
		}
		if (Mode.LAST_NTH_DAY_WEEK === mode) {
			return defaultValue;
		}
		if (Mode.NEAREST_WEEKDAY_OF_MONTH === mode) {
			return defaultValue;
		}
		if (Mode.NTH_WEEKDAY_OF_MONTH === mode) {
			return str.split(Separator.NTH_WEEKDAY_OF_MONTH);
		}
		return defaultValue;
	}
}
