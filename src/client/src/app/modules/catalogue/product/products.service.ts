import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {Product, ProductsFilter} from "../catalogue.models";
import {first, map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ProductsService {

  constructor(private http: HttpService) {

  }

  getProducts(filter?: ProductsFilter): Observable<Product[]> {
    return this.http.get('/api/products/list')
      .pipe(
        first(),
        map(result => result || []),
        map(result => this.filterProducts(result, filter)),
      )
  }

  getProduct(id: String): Promise<Product> {
    return this.http.get('/api/products/product/' + id).toPromise();
  }

  submitProduct(supplier: FormData): Promise<Product> {
    return this.http.postMultipartFormData('/api/products/product/submit', supplier)
  }

  deleteProduct(id: String): Promise<Product> {
    return this.http.post('/api/products/product/delete/' + id).toPromise()
  }

  filterProducts(products: Product[], filter?: ProductsFilter): Product[] {
    if (!filter) return products;
    return products.filter(product => {
      if (filter.category && filter.category != product.category) {
        return false;
      }
      if (filter.suppliers?.length && !filter.suppliers.includes(product.supplier)) {
        return false;
      }
      if (filter.priceFromUah && filter.priceFromUah > product.priceUah) {
        return false;
      }
      if (filter.priceToUah && filter.priceToUah < product.priceUah) {
        return false;
      }
      if (filter.name && !product.name?.toUpperCase().includes(filter.name.toUpperCase())) {
        return false;
      }
      return true;
    })
  }


}




