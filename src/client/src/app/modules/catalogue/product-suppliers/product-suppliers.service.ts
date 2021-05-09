import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {Observable} from "rxjs";


@Injectable({providedIn: "root"})
export class ProductSuppliersService {

  constructor(private http: HttpService) {

  }

  getSuppliers(): Observable<ProductSupplier[]> {
    return this.http.get('/api/suppliers/list')
      .pipe(
        map(result => result || []),
      );
  }

  getSupplier(id: String): Promise<ProductSupplier> {
    return this.http.get('/api/suppliers/supplier/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }

  submitSupplier(supplier: FormData): Promise<ProductSupplier> {
    return this.http.postMultipartFormData('/api/suppliers/supplier/submit', supplier)
  }

  deleteSupplier(id: String): Promise<ProductSupplier> {
    return this.http.post('/api/suppliers/supplier/delete/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }


}




