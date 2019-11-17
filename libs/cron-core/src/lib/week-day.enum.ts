export enum WeekDay {
	Sunday = 'Sunday',
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday'
}

export enum WeekDayCode {
	SUN = 'SUN',
	MON = 'MON',
	TUE = 'TUE',
	WED = 'WED',
	THU = 'THU',
	FRI = 'FRI',
	SAT = 'SAT'
}

const codeMap = new Map<WeekDay, WeekDayCode>(
	[
		[WeekDay.Sunday, WeekDayCode.SUN],
		[WeekDay.Monday, WeekDayCode.MON],
		[WeekDay.Tuesday, WeekDayCode.TUE],
		[WeekDay.Wednesday, WeekDayCode.WED],
		[WeekDay.Thursday, WeekDayCode.THU],
		[WeekDay.Friday, WeekDayCode.FRI],
		[WeekDay.Saturday, WeekDayCode.SAT]
	]
);

export class WeekDayUtils {
	static list() {
		return [
			WeekDay.Sunday,
			WeekDay.Monday,
			WeekDay.Tuesday,
			WeekDay.Wednesday,
			WeekDay.Thursday,
			WeekDay.Friday,
			WeekDay.Saturday
		];
	}

	static getCode(weekDay: WeekDay) {
		return codeMap.get(weekDay);
	}
}
