import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({providedIn: "root"})
export class HttpService {


  constructor(private http: HttpClient) {

  }

  get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(url, {params});
  }

  post(url: string, body?: Object, params?: HttpParams): Observable<any> {
    return this.http.post(
      url,
      body != null ? JSON.stringify(body) : null,
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: params}
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
            try {
              reject(await response.json());
            } catch (e) {
              reject(await response.text());
            }
          }
        },
        (reject) => resolve(reject)
      )
    });


  }
}
