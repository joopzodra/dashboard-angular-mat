import { Pipe, PipeTransform } from '@angular/core';
import {utcParse, timeFormat, isoParse } from 'd3-time-format';

@Pipe({
  name: 'dateIso'
})
export class DateIsoPipe implements PipeTransform {
  private months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  private shortMonths = ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec'];

  transform(value: string, ...args: any[]): string | null {
    if (value && typeof value === 'string') {
      const months = args.includes('shortMonths') ? this.shortMonths : this.months;
      const year = args.includes('noYear') ? '' :  ' ' + value.slice(0, 4);
      const month = +value.slice(5, 7) - 1;
      const day = value.slice(8, 10);
      const hour = value.slice(11, 13);
      const minutes = value.slice(14, 16);
      const time = args.includes('noTime') ? '' : `${hour}.${minutes} uur`;
      return `${day} ${months[month]} ${year} ${time}`
    }
    return null;
  }

}
