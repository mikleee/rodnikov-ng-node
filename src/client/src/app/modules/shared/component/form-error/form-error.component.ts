import {Component, Input, OnInit} from '@angular/core';
import {FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  @Input() error?: boolean;
  @Input() message?: string;
  @Input() form?: FormGroupDirective;

  ngOnInit(): void {
  }

}
