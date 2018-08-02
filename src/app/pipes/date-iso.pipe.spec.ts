import { DateIsoPipe } from './date-iso.pipe';

describe('DateIsoPipe', () => {

  let pipe: DateIsoPipe;
  const isoDate = '2018-08-01T16:00:00.383-04:00';

  beforeEach(() => {
    pipe = new DateIsoPipe();
  });

  it('formats a Iso date string as expected', () => {
    const noArgs = pipe.transform(isoDate);
    expect(noArgs).toBe('1 augustus 2018 16.00 uur', 'noArgs fails');
    const shortMonth = pipe.transform(isoDate, 'shortMonths');
    expect(shortMonth).toBe('1 aug 2018 16.00 uur', 'shortMonth fails');
    const noYearShortMonth = pipe.transform(isoDate, 'noYear', 'shortMonths');
    expect(noYearShortMonth).toBe('1 aug 16.00 uur', 'noYearShortMonth fails')
    const noTime = pipe.transform(isoDate, 'noTime');
    expect(noTime).toBe('1 augustus 2018', 'noTime fails');
    const dayNoYear = pipe.transform(isoDate, 'day', 'noYear');
    expect(dayNoYear).toBe('woensdag 1 augustus 16.00 uur', 'dayNoYear fails');
    const shortDayNoYearNoTime = pipe.transform(isoDate, 'shortDay', 'noYear', 'noTime');
    expect (shortDayNoYearNoTime).toBe('woe 1 augustus', 'shortDayNoYearNoTime fails');
  });

});
