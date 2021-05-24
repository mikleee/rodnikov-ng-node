import {Component, Input, OnInit} from '@angular/core';
import {User} from "../auth.models";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() user: User = {} as User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
