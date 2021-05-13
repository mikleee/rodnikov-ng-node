import {Directive, ElementRef} from '@angular/core';
import {ButtonBaseDirective} from "./button-base.directive";

@Directive({
  selector: '[app-button-reset]'
})
export class ButtonResetDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-x-lg')
  }
}
