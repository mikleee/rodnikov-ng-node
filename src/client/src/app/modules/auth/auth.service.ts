import {Injectable} from '@angular/core';
import {HttpService} from "../shared/service/http.service";
import {Observable} from "rxjs";
import {first, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {Session} from "./auth.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) {

  }

  getSession(): Observable<Session> {
    return this.http.get('/api/auth/session');
  }

  login(userName: string, password: string, redirect?: string): Observable<any> {
    let params = new HttpParams()
      .set('userName', userName)
      .set('password', password);
    if (redirect) {
      params = params
        .set('redirect', redirect)
    }

    return this.http.post('/api/auth/login', undefined, params)
      .pipe(
        first(),
        tap(value => {
          if (value.ok && value.redirect) {
            window.location.href = value.redirect;
          }
        })
      )
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout')
      .pipe(
        first(),
        tap(value => {
          if (value.ok && value.redirect) {
            window.location.href = value.redirect;
          }
        })
      )
  }


}
