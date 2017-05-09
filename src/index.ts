import {Enum, impl, match} from 'rusted'

export enum Precision {
  Years,
  Months,
  Days,
  Hours,
  Minutes,
  Seconds,
  MilliSeconds,
}

export type Duration = {
  toString(): string
}
export const Duration = Enum({
  MilliSeconds: 'number',
  Seconds: 'number',
  Minutes: 'number',
  Hours: 'number', 
  Days: 'number',
  Months: 'number',
}) as {
  MilliSeconds(days: number): Duration,
  Seconds(days: number): Duration,
  Minutes(days: number): Duration,
  Hours(days: number): Duration,
  Days(days: number): Duration,
  Months(months: number): Duration,

  fromString(string: string): Duration
}

impl(Duration, {
  $fromString(string: string) {
    const matches = /^Duration\.([A-Za-z]+)\(([0-9]+)\)$/.exec(string)
    if (!matches || matches.length !== 3) throw Error('Invalid string')
    const unit = Duration[matches[1]]
    if (!unit) throw Error('Invalid unit')

    return unit.call(Duration, +matches[2])
  },

  toString(self) {
    return match(self, {
      MilliSeconds: duration => `Duration.MilliSeconds(${duration})`,
      Seconds: duration => `Duration.Seconds(${duration})`,
      Minutes: duration => `Duration.Minutes(${duration})`,
      Hours: duration => `Duration.Hours(${duration})`,
      Days: duration => `Duration.Days(${duration})`,
      Months: duration => `Duration.Months(${duration})`,
    })
  },
})

export type NaturalDifference = {}
export const NaturalDifference = Enum({
  Last: Duration,
  Coming: Duration,
  Dates: Array,
}) as {
  Last(duration: Duration): NaturalDifference,
  Coming(duration: Duration): NaturalDifference,
  Dates(dates: [Date, Date]): NaturalDifference,
}

export function clone(date: Date): Date {
  return new Date(date.getTime())
}

export function add(date: Date, duration: Duration): Date {
  return match(duration, {
    MilliSeconds: ms => new Date(date.getTime() + ms),
    Seconds: seconds => new Date(clone(date).setSeconds(date.getSeconds() + seconds)),
    Minutes: minutes => new Date(clone(date).setMinutes(date.getMinutes() + minutes)),
    Hours: hours => new Date(clone(date).setHours(date.getHours() + hours)),
    Days: days => new Date(clone(date).setDate(date.getDate() + days)),
    Months: months => new Date(clone(date).setMonth(date.getMonth() + months)),
  })
}

export function subtract(date: Date, duration: Duration): Date {
  return match(duration, {
    MilliSeconds: ms => new Date(date.getTime() - ms),
    Seconds: seconds => new Date(clone(date).setSeconds(date.getSeconds() - seconds)),
    Minutes: minutes => new Date(clone(date).setMinutes(date.getMinutes() - minutes)),
    Hours: hours => new Date(clone(date).setHours(date.getHours() - hours)),
    Days: days => new Date(clone(date).setDate(date.getDate() - days)),
    Months: months => new Date(clone(date).setMonth(date.getMonth() - months)),
  })
}

impl(Date, {
  $new({precision, utc} = {precision: Precision.MilliSeconds, utc: false}) {
    const date = new Date()

    switch (precision) {
      /* tslint:disable */
      case Precision.Years:
        if (utc) {
          date.setUTCMonth(0)
        } else {
          date.setMonth(0)
        }
      case Precision.Months:
        if (utc) {
          date.setUTCDate(1)
        } else {
          date.setDate(1)
        }
      case Precision.Days:
        if (utc) {
          date.setUTCHours(1)
        } else {
          date.setHours(1)
        }
      case Precision.Hours:
        if (utc) {
          date.setUTCMinutes(1)
        } else {
          date.setMinutes(1)
        }
      case Precision.Minutes:
        if (utc) {
          date.setUTCSeconds(1)
        } else {
          date.setSeconds(1)
        }
      case Precision.Seconds:
        if (utc) {
          date.setUTCMilliseconds(1)
        } else {
          date.setMilliseconds(1)
        }
      default:
        return date
      /* tslint:enable */
    }
  },

  add(self, duration) {
    return add(self, duration)
  },

  subtract(self, duration) {
    return subtract(self, duration)
  },

  clone(self) {
    return clone(self)
  },
})

export function isEqual(a: Date, b: Date, {precision} = {precision: Precision.MilliSeconds}) {
  switch (precision) {
    case Precision.MilliSeconds:
      return a.getTime() === b.getTime()

    /* tslint:disable */
    case Precision.Seconds:
      if (a.getUTCSeconds() !== b.getUTCSeconds()) return false
    case Precision.Minutes:
      if (a.getUTCMinutes() !== b.getUTCMinutes()) return false
    case Precision.Hours:
      if (a.getUTCHours() !== b.getUTCHours()) return false
    case Precision.Days:
      if (a.getUTCDate() !== b.getUTCDate()) return false
    case Precision.Months:
      if (a.getUTCMonth() !== b.getUTCMonth()) return false
    case Precision.Years:
      return a.getUTCFullYear() === b.getUTCFullYear()
    /* tslint:enable */
    default:
      throw 'Invalid precision'
  }
}

export function diffDays(from: Date|number, to: Date|number) {
  if (from instanceof Date) from = from.getTime()
  if (to instanceof Date) to = to.getTime()
  return Math.floor((to - from) / 1000 / 60 / 60 / 24)
}

export function diffMonths(from: Date, to: Date) {
  const years = to.getFullYear() - from.getFullYear()
  const months = (to.getMonth() - from.getMonth()) + years * 12
  return months
}

export function timeBetween(from: Date, to: Date) {
  if (isEqual(from, to)) return Duration.Days(0)

  if (from.getMonth() === to.getMonth() && from.getDate() === to.getDate() && from.getFullYear() === to.getFullYear()) {
    return Duration.Days(diffDays(from, to))
  }
  else if (from.getDate() === to.getDate()) {
    return Duration.Months(diffMonths(from, to))
  }
  else {
    return Duration.Days(diffDays(from, to))
  }
}

export function naturalDifference(from: Date, to: Date, {precision} = {precision: Precision.Days}) {
  if (isEqual(to, new Date(), {precision})) {
    return NaturalDifference.Last(timeBetween(from, to))
  }
  else if (isEqual(from, new Date(), {precision})) {
    return NaturalDifference.Coming(timeBetween(from, to))
  }
  else {
    return NaturalDifference.Dates([from, to])
  }
}
