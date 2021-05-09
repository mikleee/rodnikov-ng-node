import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {GlobalToasterService} from "../component/global-toaster/global-toaster.service";
import {catchError} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class HttpService {


  constructor(
    private http: HttpClient,
    private globalToasterService: GlobalToasterService
  ) {

  }

  get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(url, {params})
      .pipe(
        catchError(error => {
          this.globalToasterService.error(error.message);
          return throwError(error);
        })
      )
  }

  post(url: string, body?: Object, params?: HttpParams): Observable<any> {
    return this.http.post(
      url,
      body != null ? JSON.stringify(body) : null,
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: params}
    )
      .pipe(
        catchError(error => {
          this.globalToasterService.error(error.message);
          return throwError(error);
        })
      )
  }

  postMultipartFormData(url: string, formData: FormData, params?: Object): Promise<any> {
    if (params != null) {
      let parts = url.split('?');
      let uri = parts[0];
      let q = new URLSearchParams(parts[1]);
      for (let [k, v] of Object.entries(params)) {
        q.append(k, v)
      }
      url = uri + '?' + q.toString();
    }

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(
        async (response) => {
          if (response.ok) {
            resolve(await response.json());
          } else {
            let responseBody = await response.text();
            let result;
            try {
              let responseBodyObject = JSON.parse(responseBody);
              result = responseBodyObject?.message;
            } catch (e) {
              result = responseBody;
            }
            this.globalToasterService.error(result);
            reject({message: result});
          }
        },
        (error) => {
          this.globalToasterService.error(error);
          resolve(reject);
        }
      )
    });
  }

}
