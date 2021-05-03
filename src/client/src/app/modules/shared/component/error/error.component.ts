import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() message?: String;

  constructor() {
  }

  ngOnInit(): void {
  }

}
