import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceH2'
})
export class ReplaceH2Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }
    return value.replace(/h2>/g, 'h4>');
  }

}
