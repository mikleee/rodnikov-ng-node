import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {ProductCategory, ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {Observable} from "rxjs";


@Injectable({providedIn: "root"})
export class ProductCategoryService {

  constructor(private http: HttpService) {

  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get('/api/categories/list')
      .pipe(
        first(),
        map(result => result || []),
        map(result => this.assignSubcategories(result)),
      )
  }

  getProductCategory(id: String): Promise<ProductCategory> {
    return this.http.get('/api/categories/category/' + id).toPromise();
  }

  submitProductCategory(supplier: ProductCategory): Promise<ProductCategory> {
    return this.http.post('/api/categories/category/submit', supplier).toPromise();
  }

  deleteGroup(id: String): Promise<ProductSupplier> {
    return this.http.post('/api/categories/category/delete/' + id).toPromise();
  }

  assignSubcategories(input: ProductCategory[]): ProductCategory[] {
    const result: ProductCategory[] = [];

    const idMapping: { [key: string]: ProductCategory } = {};
    const parentChildMapping: { [key: string]: string[] } = {};

    input?.forEach(g => {
      result.push(g as ProductCategory);
      idMapping[g.id] = g;

      if (g.parent) {
        let arr = parentChildMapping[g.parent] || [];
        arr.push(g.id);
        parentChildMapping[g.parent] = arr;
      }
    });

    result.forEach(g => {
      g.categories = (parentChildMapping[g.id] || []).map(c => idMapping[c] as ProductCategory);
    });
    return result;
  }

  buildTree(input: ProductCategory[]): ProductCategory[] {
    return this.assignSubcategories(input).filter(g => !g.parent);
  }


}




