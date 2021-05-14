import {Directive, ElementRef} from '@angular/core';


class ButtonBaseDirective {
  constructor(element: ElementRef, iconClass: string) {
    element.nativeElement.innerHTML = `<i class="${iconClass}"></i>`
  }

}


@Directive({
  selector: '[app-button-add]'
})
export class ButtonAddDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-plus')
  }
}

@Directive({
  selector: '[app-button-cancel]'
})
export class ButtonCancelDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-x')
  }
}

@Directive({
  selector: '[app-button-delete]'
})
export class ButtonDeleteDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-trash')
  }
}

@Directive({
  selector: '[app-button-edit]'
})
export class ButtonEditDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    debugger;
    super(element, 'bi-pencil')
  }
}

@Directive({
  selector: '[app-button-ok]'
})
export class ButtonOkDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-check-lg')
  }
}

@Directive({
  selector: '[app-button-reset]'
})
export class ButtonResetDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-x-lg')
  }
}

@Directive({
  selector: '[app-button-save]'
})
export class ButtonSaveDirective extends ButtonBaseDirective {
  constructor(element: ElementRef) {
    super(element, 'bi-save')
  }
}





