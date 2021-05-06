import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {modelsToMap} from "../../shared/model/base.model";


@Injectable({providedIn: "root"})
export class ProductSuppliersService {
  private suppliers$ = new ReplaySubject<{ [key: string]: ProductSupplier }>();
  private needLoad = true;

  constructor(private http: HttpService) {

  }

  getSuppliers(): Observable<{ [key: string]: ProductSupplier }> {
    if (this.needLoad) {
      this.loadSuppliers();
    }
    return this.suppliers$
  }

  getSupplier(id: String): Promise<ProductSupplier> {
    return this.http.get('/api/suppliers/supplier/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }

  submitSupplier(supplier: FormData): Promise<ProductSupplier> {
    let promise = this.http.postMultipartFormData('/api/suppliers/supplier/submit', supplier);
    promise.then(() => this.loadSuppliers());
    return promise
  }

  deleteSupplier(id: String): Promise<ProductSupplier> {
    let promise = this.http.post('/api/suppliers/supplier/delete/' + id)
      .pipe(
        first()
      )
      .toPromise();
    promise.then(() => this.loadSuppliers());
    return promise
  }


  private loadSuppliers() {
    this.http.get('/api/suppliers/list')
      .pipe(
        first(),
        map(result => result || []),
        map(result => modelsToMap(result as ProductSupplier[])),
      )
      .subscribe(
        value => {
          this.needLoad = false;
          this.suppliers$.next(value)
        },
        value => this.suppliers$.error(value.message),
      )
  }


}




