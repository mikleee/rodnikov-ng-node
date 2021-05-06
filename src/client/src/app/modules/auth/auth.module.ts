import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
