import {Directive, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {isNotBlank} from "../utils";

@Directive({
  selector: '[app-input-number]'
})
export class InputNumberDirective implements OnInit, OnDestroy {
  change$?: Subscription;
  last: string = '';

  constructor(private control: NgControl) {
  }

  ngOnInit() {
    this.change$ = this.control.control?.valueChanges.subscribe(value => {
      if (isNotBlank(value) && !/^\d+$/.test(value)) {
        this.control.control?.setValue(this.last);
      } else {
        this.last = value;
      }
    })
  }

  ngOnDestroy(): void {
    this.change$?.unsubscribe();
  }


}
