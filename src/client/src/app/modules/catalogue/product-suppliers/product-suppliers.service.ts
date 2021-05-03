import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {ProductSupplier} from "../catalogue.models";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ProductSuppliersService {
  private suppliers = new Subject<ProductSupplier[]>();

  constructor(private http: HttpService) {

  }

  loadSuppliers(): Subject<ProductSupplier[]> {
    this.http.get('/api/suppliers/list')
      .pipe(map(result => result || []))
      .subscribe(
        value => this.suppliers.next(value),
        value => this.suppliers.error(value.message),
      )
    return this.suppliers;
  }

  getSupplier(id: String): Promise<ProductSupplier> {
    return this.http.get('/api/suppliers/supplier/' + id).toPromise();
  }

  submitSupplier(supplier: FormData): Promise<ProductSupplier> {
    let promise = this.http.postMultipartFormData('/api/suppliers/supplier/submit', supplier);
    promise.then(value => this.loadSuppliers());
    return promise
  }

  deleteSupplier(id: String): Promise<ProductSupplier> {
    let promise = this.http.post('/api/suppliers/supplier/delete/' + id).toPromise();
    promise.then(value => this.loadSuppliers());
    return promise
  }


}




