/// <reference types="jest" />
import {
  Duration,
  NaturalDifference,
  Precision,
  diffDays,
  diffMonths,
  isEqual,
  naturalDifference,
  timeBetween,
} from './index'

function makeVisible(enumValue) {
  const {__data, __name} = enumValue as any
  if (__data && __data.__rusted) {
    return {__data: makeVisible(__data), __name}
  }
  return {__data, __name}
}

describe('date', () => {
  describe('add', () => {
    describe('days', () => {
      it('shoud add the number of days', () => {
        expect(new Date(2000, 0, 1).add(Duration.Days(5))).toEqual(new Date(2000, 0, 6))
        expect(new Date(2008, 1, 28).add(Duration.Days(1))).toEqual(new Date(2008, 1, 29))
        expect(new Date(2008, 1, 28).add(Duration.Days(3))).toEqual(new Date(2008, 2, 2))
        expect(new Date(2010, 11, 28).add(Duration.Days(10))).toEqual(new Date(2011, 0, 7))
      })
    })

    describe('months', () => {
      it('shoud add the number of months', () => {
        expect(new Date(2000, 0, 1).add(Duration.Months(5))).toEqual(new Date(2000, 5, 1))
        expect(new Date(2005, 9, 1).add(Duration.Months(5))).toEqual(new Date(2006, 2, 1))
      })
    })
  })

  describe('subtract', () => {
    describe('days', () => {
      it('shoud subtract the number of days', () => {
        expect(new Date(2000, 0, 6).subtract(Duration.Days(5))).toEqual(new Date(2000, 0, 1))
        expect(new Date(2008, 1, 29).subtract(Duration.Days(1))).toEqual(new Date(2008, 1, 28))
        expect(new Date(2008, 2, 1).subtract(Duration.Days(1))).toEqual(new Date(2008, 1, 29))
        expect(new Date(2008, 2, 2).subtract(Duration.Days(3))).toEqual(new Date(2008, 1, 28))
        expect(new Date(2011, 0, 7).subtract(Duration.Days(10))).toEqual(new Date(2010, 11, 28))
      })
    })

    describe('months', () => {
      it('shoud subtract the number of months', () => {
        expect(new Date(2000, 5, 1).subtract(Duration.Months(5))).toEqual(new Date(2000, 0, 1))
        expect(new Date(2006, 2, 1).subtract(Duration.Months(5))).toEqual(new Date(2005, 9, 1))
      })
    })
  })

  describe('isEqual', () => {
    it('shoud support year precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.Years},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.Years},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.Years},
      )).toBe(true)
      expect(isEqual(new Date(2000, 0, 2, 10), new Date(2000, 0, 2, 5), {precision: Precision.Years})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.Years})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.Years})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 2), {precision: Precision.Years})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.Years})).toBe(false)
    })

    it('shoud support month precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.Months},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.Months},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.Months},
      )).toBe(true)
      expect(isEqual(new Date(2000, 0, 2, 10), new Date(2000, 0, 2, 5), {precision: Precision.Months})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 2), {precision: Precision.Months})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.Months})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.Months})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.Months})).toBe(false)
    })

    it('shoud support days precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.Days},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.Days},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.Days},
      )).toBe(true)
      expect(isEqual(new Date(2000, 0, 2, 10), new Date(2000, 0, 2, 5), {precision: Precision.Days})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 2), {precision: Precision.Days})).toBe(true)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.Days})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.Days})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.Days})).toBe(false)
    })

    it('shoud support minutes precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.Minutes},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.Minutes},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.Minutes},
      )).toBe(false)
      expect(isEqual(new Date(2000, 0, 2, 10), new Date(2000, 0, 2, 5), {precision: Precision.Minutes})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.Minutes})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.Minutes})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.Minutes})).toBe(false)
    })

    it('shoud support seconds precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.Seconds},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.Seconds},
      )).toBe(false)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.Seconds},
      )).toBe(false)
      expect(isEqual(new Date(2000, 0, 2, 10), new Date(2000, 0, 2, 5), {precision: Precision.Seconds})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.Seconds})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.Seconds})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.Seconds})).toBe(false)
    })

    it('shoud support milliseconds precision', () => {
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 10),
        {precision: Precision.MilliSeconds},
      )).toBe(true)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 10, 5),
        {precision: Precision.MilliSeconds},
      )).toBe(false)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10, 10),
        new Date(2000, 0, 2, 10, 10, 5),
        {precision: Precision.MilliSeconds},
      )).toBe(false)
      expect(isEqual(
        new Date(2000, 0, 2, 10, 10),
        new Date(2000, 0, 2, 10, 50),
        {precision: Precision.MilliSeconds},
      )).toBe(false)
      expect(isEqual(
        new Date(2000, 0, 2, 10),
        new Date(2000, 0, 2, 5),
        {precision: Precision.MilliSeconds},
      )).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 0, 5), {precision: Precision.MilliSeconds})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2000, 5, 1), {precision: Precision.MilliSeconds})).toBe(false)
      expect(isEqual(new Date(2000, 0, 2), new Date(2001, 0, 2), {precision: Precision.MilliSeconds})).toBe(false)
    })
  })

  describe('daysDiff', () => {
    it('should count the number of days between the dates', () => {
      expect(diffDays(new Date(2000, 1, 1), new Date(2000, 1, 1))).toBe(0)
      expect(diffDays(new Date(2000, 1, 1), new Date(2000, 1, 2))).toBe(1)
      expect(diffDays(new Date(2000, 1, 1), new Date(2000, 1, 10))).toBe(9)
      // Use strings due to daylight saving time in some locales
      expect(diffDays(new Date('2000-03-01'), new Date('2000-04-01'))).toBe(31)
    })

    it('should work in reverse', () => {
      expect(diffDays(new Date(2000, 1, 2), new Date(2000, 1, 1))).toBe(-1)
      expect(diffDays(new Date(2000, 1, 10), new Date(2000, 1, 1))).toBe(-9)
      expect(diffDays(new Date(2000, 3, 1), new Date(2000, 2, 1))).toBe(-31)
    })

    it('should work with timestamps', () => {
      expect(diffDays(new Date(2000, 1, 1).getTime(), new Date(2000, 1, 1).getTime())).toBe(0)
      expect(diffDays(new Date(2000, 1, 1).getTime(), new Date(2000, 1, 2).getTime())).toBe(1)
      expect(diffDays(new Date(2000, 1, 1).getTime(), new Date(2000, 1, 10).getTime())).toBe(9)
      // Use strings due to daylight saving time in some locales
      expect(diffDays(new Date('2000-03-01').getTime(), new Date('2000-04-01').getTime())).toBe(31)
      expect(diffDays(new Date(2000, 1, 2).getTime(), new Date(2000, 1, 1).getTime())).toBe(-1)
      expect(diffDays(new Date(2000, 1, 10).getTime(), new Date(2000, 1, 1).getTime())).toBe(-9)
      expect(diffDays(new Date(2000, 3, 1).getTime(), new Date(2000, 2, 1).getTime())).toBe(-31)
    })
  })

  describe('monthsDiff', () => {
    it('should count the number of days between the dates', () => {
      expect(diffMonths(new Date(2000, 1, 1), new Date(2000, 1, 1))).toBe(0)
      expect(diffMonths(new Date(2000, 1, 1), new Date(2000, 2, 1))).toBe(1)
      expect(diffMonths(new Date(2000, 1, 10), new Date(2001, 2, 10))).toBe(13)
      expect(diffMonths(new Date(2000, 1, 10), new Date(2000, 12, 10))).toBe(11)
      expect(diffMonths(new Date(2000, 2, 31), new Date(2000, 4, 31))).toBe(2)
    })

    it('should work in reverse', () => {
      expect(diffMonths(new Date(2000, 2, 1), new Date(2000, 1, 1))).toBe(-1)
      expect(diffMonths(new Date(2000, 10, 10), new Date(2000, 1, 1))).toBe(-9)
    })
  })

  describe('timeBetween', () => {
    it('should count the number of days between most dates', () => {
      expect(makeVisible(timeBetween(new Date(2000, 1, 1), new Date(2000, 1, 1))))
        .toEqual(makeVisible(Duration.Days(0)))
      expect(makeVisible(timeBetween(new Date(2000, 1, 1), new Date(2000, 1, 2))))
        .toEqual(makeVisible(Duration.Days(1)))
      expect(makeVisible(timeBetween(new Date(2000, 1, 1), new Date(2000, 1, 10))))
        .toEqual(makeVisible(Duration.Days(9)))
    })

    it('should count the number of days between whole months dates', () => {
      expect(makeVisible(timeBetween(new Date(2000, 1, 1), new Date(2000, 2, 1))))
        .toEqual(makeVisible(Duration.Months(1)))
      expect(makeVisible(timeBetween(new Date(2000, 1, 1), new Date(2001, 1, 1))))
        .toEqual(makeVisible(Duration.Months(12)))
      expect(makeVisible(timeBetween(new Date(2000, 1, 20), new Date(2000, 5, 20))))
        .toEqual(makeVisible(Duration.Months(4)))
    })
  })

  describe('naturalDifference', () => {
    it('should count the last days up to today', () => {
      expect(makeVisible(naturalDifference(new Date(), new Date())))
        .toEqual(makeVisible(NaturalDifference.Last(Duration.Days(0))))
      expect(makeVisible(naturalDifference(new Date().subtract(Duration.Days(10)), new Date())))
        .toEqual(makeVisible(NaturalDifference.Last(Duration.Days(10))))
    })

    it('should count the last months up to today', () => {
      expect(makeVisible(naturalDifference(new Date().subtract(Duration.Months(10)), new Date())))
        .toEqual(makeVisible(NaturalDifference.Last(Duration.Months(10))))
    })

    it('should count the coming days from today', () => {
      expect(makeVisible(naturalDifference(new Date(), new Date().add(Duration.Days(10)))))
        .toEqual(makeVisible(NaturalDifference.Coming(Duration.Days(10))))
    })

    it('should count the coming months from today', () => {
      expect(makeVisible(naturalDifference(new Date(), new Date().add(Duration.Months(10)))))
        .toEqual(makeVisible(NaturalDifference.Coming(Duration.Months(10))))
    })

    it('should count the days between avarge dates', () => {
      const from = new Date().subtract(Duration.Days(10))
      const to = new Date().add(Duration.Days(10))

      expect(makeVisible(naturalDifference(from, to)))
        .toEqual(makeVisible(NaturalDifference.Dates([from, to])))
    })

    it('should count the months between avarge dates that are whole months away', () => {
      const from = new Date().subtract(Duration.Months(10))
      const to = new Date().add(Duration.Months(10))

      expect(makeVisible(naturalDifference(from, to)))
        .toEqual(makeVisible(NaturalDifference.Dates([from, to])))
    })
  })
})
