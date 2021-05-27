import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {Product, ProductsFilter} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {DatatableResponse} from "../../shared/model/datatable.model";


@Injectable({providedIn: "root"})
export class ProductsService {

  constructor(private http: HttpService) {

  }

  getProducts(filter?: ProductsFilter): Observable<Product[]> {
    return this.http.get('/api/products/list')
      .pipe(
        first(),
        map(result => result || [] as Product[]),
        map(result => this.filterProducts(result, filter)),
      )
  }

  getProductsByCriteria(keyword?: string, category?: string, suppliers?: string[]): Observable<Product[]> {
    const params: { [param: string]: string | string[] } = {};
    if (keyword) params['keyword'] = keyword;
    if (category) params['category'] = category;
    if (suppliers?.length) params['suppliers'] = suppliers;

    return this.http.get('/api/products/showcase', params)
      .pipe(
        first(),
        map(result => result || []),
      )
  }

  searchProducts(keyword: string, limit?: number): Observable<DatatableResponse<Product>> {
    const params: { [param: string]: string | string[] } = {};
    if (keyword) params['keyword'] = keyword;
    if (limit) params['limit'] = limit.toString();
    return this.http.get('/api/products/search', params);
  }

  getProduct(id: String): Observable<Product> {
    return this.http.get('/api/products/product/' + id);
  }

  submitProduct(product: FormData): Promise<Product> {
    return this.http.post('/api/products/submit', product)
      .pipe(first())
      .toPromise()
  }

  deleteProduct(id: String): Promise<Product> {
    return this.http.post('/api/products/delete/' + id)
      .pipe(first())
      .toPromise()
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
      if (filter.priceFrom && filter.priceFrom > product.priceUah) {
        return false;
      }
      if (filter.priceTo && filter.priceTo < product.priceUah) {
        return false;
      }
      if (filter.name && !product.name?.toUpperCase().includes(filter.name.toUpperCase())) {
        return false;
      }
      if (filter.code && !product.code?.toUpperCase().includes(filter.code.toUpperCase())) {
        return false;
      }
      return true;
    })
  }


}




