import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {Product, ProductSupplier} from "../catalogue.models";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ProductsService {
  private products$ = new Subject<Product[]>();

  constructor(private http: HttpService) {

  }

  loadProducts(): Subject<Product[]> {
    this.http.get('/api/products/list')
      .pipe(map(result => result || []))
      .subscribe(
        value => this.products$.next(value),
        value => this.products$.error(value.message),
      )
    return this.products$;
  }

  getProduct(id: String): Promise<ProductSupplier> {
    return this.http.get('/api/products/product/' + id).toPromise();
  }

  submitProduct(supplier: FormData): Promise<ProductSupplier> {
    let promise = this.http.postMultipartFormData('/api/products/product/submit', supplier);
    promise.then(value => this.loadProducts());
    return promise
  }

  deleteProduct(id: String): Promise<ProductSupplier> {
    let promise = this.http.post('/api/suppliers/supplier/delete/' + id).toPromise();
    promise.then(value => this.loadProducts());
    return promise
  }


}




