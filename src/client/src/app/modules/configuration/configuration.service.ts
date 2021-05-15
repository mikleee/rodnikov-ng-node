import {Injectable} from '@angular/core';
import {HttpService} from "../shared/service/http.service";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";
import {Configuration} from "./configuration.models";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpService) {

  }

  getConfigurations(): Observable<Configuration[]> {
    return this.http.get('/api/configurations/list')
      .pipe(
        map(result => result || []),
      );
  }

  getConfiguration(key: string): Promise<Configuration> {
    return this.http.get('/api/configurations/configuration', {key: key})
      .pipe(
        first()
      )
      .toPromise();
  }

  submitConfigurations(configurations: Configuration[]): Promise<Configuration[]> {
    return this.http.post('/api/configurations/submit', configurations)
      .pipe(
        first()
      )
      .toPromise();
  }

  submitConfiguration(configuration: Configuration): Promise<Configuration> {
    return this.http.post('/api/configurations/submit', [configuration])
      .pipe(
        first(),
        map(c => c[0])
      )
      .toPromise();
  }
}
