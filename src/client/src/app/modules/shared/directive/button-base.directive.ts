import {ElementRef} from '@angular/core';


export class ButtonBaseDirective {
  constructor(element: ElementRef, iconClass: string) {
    element.nativeElement.innerHTML = `<i class="${iconClass}"></i>`
  }


}
