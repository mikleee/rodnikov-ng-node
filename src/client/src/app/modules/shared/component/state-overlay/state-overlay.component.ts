import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ViewState} from "../../model/view-state.model";

@Component({
  selector: 'app-state-overlay',
  templateUrl: './state-overlay.component.html',
  styleUrls: ['./state-overlay.component.scss']
})
export class StateOverlayComponent implements AfterViewInit {
  @Input() state?: ViewState;
  @ViewChild('stateOverlay') elem?: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    let elem = this.elem?.nativeElement;
    if (elem) {
      elem.parentNode.parentNode.style.position = 'relative';
    }
  }

}
