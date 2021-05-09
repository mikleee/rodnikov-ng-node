import {Pipe} from '@angular/core';
import {CurrencyPipe} from "./currency.pipe";

@Pipe({
  name: 'currencyUah'
})
export class CurrencyUahPipe extends CurrencyPipe {

  transform(value: unknown, ...args: unknown[]): unknown {
    let number = super.transform(value, args);
    return number == null ? null : '₴' + number;
  }

}
