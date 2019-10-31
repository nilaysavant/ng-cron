export enum Month {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December'
}

export enum MonthCode {
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC'
}

const codeMap = new Map<Month, MonthCode>(
  [
    [Month.January, MonthCode.JAN],
    [Month.February, MonthCode.FEB],
    [Month.March, MonthCode.MAR],
    [Month.April, MonthCode.APR],
    [Month.May, MonthCode.MAY],
    [Month.June, MonthCode.JUN],
    [Month.July, MonthCode.JUL],
    [Month.August, MonthCode.AUG],
    [Month.September, MonthCode.SEP],
    [Month.October, MonthCode.OCT],
    [Month.November, MonthCode.NOV],
    [Month.December, MonthCode.DEC]
  ]
);

export class MonthUtils {
  static everyList() {
    return [
      '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
      '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th',
      '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th',
      '29th', '30th', '31st'
    ];
  }

  static list() {
    return [
      Month.January,
      Month.February,
      Month.March,
      Month.April,
      Month.May,
      Month.June,
      Month.July,
      Month.August,
      Month.September,
      Month.October,
      Month.November,
      Month.December
    ];
  }

  static getCode(weekDay: Month) {
    return codeMap.get(weekDay);
  }
}
