import {Component, Input, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {ViewState} from "../../model/view-state.model";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-async-dropdown',
  templateUrl: './async-dropdown.component.html',
  styleUrls: ['./async-dropdown.component.scss']
})
export class AsyncDropdownComponent implements OnInit {
  @Input() values$?: Observable<KeyValue<string, string>[]>;
  @Input() select$?: Subject<KeyValue<string, string>>
  @Input() nullOption?: KeyValue<string, string>
  @Input() id: string = new Date().getTime().toString();
  @Input() formControlName?: string;
  @Input() cssClass: string = '';
  state: ViewState = new ViewState();

  constructor() {
  }

  ngOnInit(): void {
    this.values$ = this.values$ || of([]);
    this.state.inProgress();
    this.values$.subscribe(
      result => this.state.ready(),
      error => this.state.error(error.message)
    )
  }


}

