import {Directive, ElementRef} from '@angular/core';
import {ButtonBaseDirective} from "./button-base.directive";

@Directive({
  selector: '[app-button-ok]'
})
export class ButtonOkDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-check-lg')
  }
}
