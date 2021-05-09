import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uplift'
})
export class UpliftPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let number = Number(value)
    if (isNaN(number)) {
      return value;
    } else {
      return number == null ? null : number + '%';
    }
  }

}
