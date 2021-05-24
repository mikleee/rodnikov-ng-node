import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';
import {LoginPopupComponent} from './login/login-popup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserMenuComponent} from './user-menu/user-menu.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    UserComponent,
    LoginPopupComponent,
    UserMenuComponent
  ],
  exports: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule {
}
