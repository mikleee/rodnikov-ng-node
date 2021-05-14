import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Observable} from "rxjs";
import {ProductAttributeTemplate, ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeTemplateService {

  constructor(private http: HttpService) {

  }

  getAttributeTemplates(): Observable<ProductAttributeTemplate[]> {
    return this.http.get('/api/product-attribute-templates/list')
      .pipe(
        map(result => result || []),
      );
  }

  getAttributeTemplate(id: String): Promise<ProductSupplier> {
    return this.http.get('/api/product-attribute-templates/template/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }

  submitTemplate(template: ProductAttributeTemplate): Promise<ProductAttributeTemplate> {
    return this.http.post('/api/product-attribute-templates/submit', template)
      .pipe(
        first()
      )
      .toPromise();
  }

  deleteTemplate(id: String): Promise<ProductAttributeTemplate> {
    return this.http.post('/api/product-attribute-templates/delete/' + id)
      .pipe(
        first()
      )
      .toPromise();
  }

}
