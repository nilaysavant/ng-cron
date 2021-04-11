export enum Segment {
	seconds = 'seconds',
	minutes = 'minutes',
	hours = 'hours',
	dayOfMonth = 'dayOfMonth',
	month = 'month',
	dayOfWeek = 'dayOfWeek',
	year = 'year'
}

export const getSegmentsList = () => [
	Segment.seconds,
	Segment.minutes,
	Segment.hours,
	Segment.dayOfMonth,
	Segment.month,
	Segment.dayOfWeek,
	Segment.year
];