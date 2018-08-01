import { Pipe, PipeTransform } from '@angular/core';
import {utcParse, timeFormat, isoParse } from 'd3-time-format';

@Pipe({
  name: 'dateIso'
})
export class DateIsoPipe implements PipeTransform {

  private months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  private shortMonths = ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec'];
  private days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  private shortDays = ['zo', 'ma', 'di', 'woe', 'do', 'vrij', 'za'];

  transform(value: string, ...args: any[]): string | null {
    if (value && typeof value === 'string') {
      const parsedDate = new Date(value);
      const months = args.includes('shortMonths') ? this.shortMonths : this.months;
      const year = args.includes('noYear') ? '' :  ' ' + value.slice(0, 4);
      const month = +value.slice(5, 7) - 1;
      const day = value.slice(8, 10);
      const hour = value.slice(11, 13);
      const minutes = value.slice(14, 16);
      const time = args.includes('noTime') ? '' : `${hour}.${minutes} uur`;
      let weekday = '';
      if (args.includes('day')) {
        const weekDayNumber = parsedDate.getDay();
        weekday = this.days[weekDayNumber];
      } else if (args.includes('shortDay')) {
        const weekDayNumber = parsedDate.getDay();
        weekday = this.shortDays[weekDayNumber];
      }
      return `${weekday} ${day} ${months[month]} ${year} ${time}`.trim()
    }
    return null;
  }

}
