import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {Product} from "../catalogue.models";
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

  getProduct(id: String): Promise<Product> {
    return this.http.get('/api/products/product/' + id).toPromise();
  }

  submitProduct(supplier: FormData): Promise<Product> {
    let promise = this.http.postMultipartFormData('/api/products/product/submit', supplier);
    promise.then(value => this.loadProducts());
    return promise
  }

  deleteProduct(id: String): Promise<Product> {
    let promise = this.http.post('/api/products/product/delete/' + id).toPromise();
    promise.then(value => this.loadProducts());
    return promise
  }


}




