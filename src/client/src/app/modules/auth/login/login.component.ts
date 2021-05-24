import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ViewState} from "../../shared/model/view-state.model";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {invalidValidator} from "../../shared/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state: ViewState = new ViewState();
  invalidLogins: string[] = [];
  invalidPasswords: string[] = [];

  fm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, invalidValidator(value => !this.invalidLogins.includes(value))]),
    password: new FormControl(null, [Validators.required, invalidValidator(value => !this.invalidPasswords.includes(value))])
  });


  constructor(private loginService: AuthService,
              private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  login() {
    if (this.fm.valid) {
      const params = (this.activatedRoute.queryParams as BehaviorSubject<any>).getValue();
      this.state.isInProgress();
      this.fm.disable();
      let login = this.fm.controls.userName.value;
      let password = this.fm.controls.password.value;
      this.loginService.login(login, password, params.redirect)
        .subscribe(
          value => {
            if (value.login === false) {
              this.invalidLogins.push(login);
            }
            if (value.password === false) {
              this.invalidPasswords.push(password);
            }
            this.state.ready();
            this.fm.enable();
          },
          error => {
            this.fm.enable();
            this.state.error(error.message)
          }
        );
    }
  }

}
