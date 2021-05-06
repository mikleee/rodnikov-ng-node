import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let number = Number(value)
    if (isNaN(number)) {
      return value;
    } else {
      return number.toFixed(2);
    }
  }

}
