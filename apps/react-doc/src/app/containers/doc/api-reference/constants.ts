export const tabExample = 
`enum Tab {
	SECONDS = 'SECONDS',
	MINUTES = 'MINUTES',
	HOURS = 'HOURS',
	DAY = 'DAY',
	MONTH = 'MONTH',
	YEAR = 'YEAR'
}`;


export const cronLocalizationExample = 
`type CronLocalization = {
  common?: {
    month?: {
      january?: string,
      february?: string,
      march?: string,
      april?: string,
      may?: string,
      june?: string,
      july?: string,
      august?: string,
      september?: string,
      october?: string,
      november?: string,
      december?: string
    },
    dayOfWeek?: {
      sunday?: string,
      monday?: string,
      tuesday?: string,
      wednesday?: string,
      thursday?: string,
      friday?: string,
      saturday?: string
    },
    dayOfMonth?: {
      '1st'?: string,
      '2nd'?: string,
      '3rd'?: string,
      '4th'?: string,
      '5th'?: string,
      '6th'?: string,
      '7th'?: string,
      '8th'?: string,
      '9th'?: string,
      '10th'?: string,
      '11th'?: string,
      '12th'?: string,
      '13th'?: string,
      '14th'?: string,
      '15th'?: string,
      '16th'?: string,
      '17th'?: string,
      '18th'?: string,
      '19th'?: string,
      '20th'?: string,
      '21st'?: string,
      '22nd'?: string,
      '23rd'?: string,
      '24th'?: string,
      '25th'?: string,
      '26th'?: string,
      '27th'?: string,
      '28th'?: string,
      '29th'?: string,
      '30th'?: string,
      '31st'?: string
    }
  },
  tabs?: {
    seconds?: string,
    minutes?: string,
    hours?: string,
    day?: string,
    month?: string,
    year?: string
  },
  quartz?: {
    day?: {
      every?: {
        label?: string
      },
      dayOfWeekIncrement?: {
        label1?: string,
        label2?: string
      },
      dayOfMonthIncrement?: {
        label1?: string,
        label2?: string,
        label3?: string
      },
      dayOfWeekAnd?: {
        label?: string
      },
      dayOfMonthAnd?: {
        label?: string
      },
      dayOfMonthLastDay?: {
        label?: string
      },
      dayOfMonthLastDayWeek?: {
        label?: string
      },
      dayOfWeekLastNTHDayWeek?: {
        label1?: string,
        label2?: string
      },
      dayOfMonthDaysBeforeEndMonth?: {
        label?: string
      },
      dayOfMonthNearestWeekDayOfMonth?: {
        label1?: string,
        label2?: string
      },
      dayOfWeekNTHWeekDayOfMonth?: {
        label1?: string,
        label2?: string
      }
    },
    month?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    second?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string,
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    minute?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    hour?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    year?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    }
  },
  unix?: {
    day?: {
      every?: {
        label?: string
      },
      dayOfWeekIncrement?: {
        label1?: string,
        label2?: string
      },
      dayOfMonthIncrement?: {
        label1?: string,
        label2?: string
      },
      dayOfWeekAnd?: {
        label?: string
      },
      dayOfMonthAnd?: {
        label?: string
      }
    },
    month?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    minute?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    },
    hour?: {
      every?: {
        label?: string
      },
      increment?: {
        label1?: string,
        label2?: string
      },
      and?: {
        label?: string
      },
      range?: {
        label1?: string,
        label2?: string
      }
    }
  }
};`;