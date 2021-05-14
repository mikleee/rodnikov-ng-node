import {Injectable} from '@angular/core';
import {HttpService} from "../../../shared/service/http.service";
import {Observable} from "rxjs";
import {ProductAttribute} from "../../catalogue.models";
import {first, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  constructor(private http: HttpService) {

  }

  getAttributesForProduct(productId: string): Observable<ProductAttribute[]> {
    return this.http.get('/api/product-attributes/list-for-product/' + productId)
      .pipe(
        map(result => result || []),
      );
  }

  submitProductAttribute(template: ProductAttribute): Promise<ProductAttribute> {
    return this.http.post('/api/product-attributes/submit', template)
      .pipe(
        first()
      )
      .toPromise();
  }

  deleteAttribute(id: String): Promise<void> {
    return this.http.post('/api/product-attributes/delete/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }
}
