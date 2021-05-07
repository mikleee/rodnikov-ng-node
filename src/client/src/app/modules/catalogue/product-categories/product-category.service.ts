import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {ProductCategory, ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {modelsToMap} from "../../shared/model/base.model";


@Injectable({providedIn: "root"})
export class ProductCategoryService {
  private categories$ = new ReplaySubject<{ [key: string]: ProductCategory }>();
  private needLoad = true;

  constructor(private http: HttpService) {

  }

  getProductCategories(): Observable<{ [key: string]: ProductCategory }> {
    if (this.needLoad) {
      this.loadProductCategories();
    }
    return this.categories$;
  }

  getProductCategoriesTree(): Observable<ProductCategory[]> {
    return this.categories$.pipe(
      map(value => this.buildTree(Object.values(value)))
    );
  }

  getProductCategory(id: String): Promise<ProductCategory> {
    return this.http.get('/api/categories/category/' + id).toPromise();
  }

  submitProductCategory(supplier: ProductCategory): Promise<ProductCategory> {
    let promise = this.http.post('/api/categories/category/submit', supplier).toPromise();
    promise.then(value => this.loadProductCategories());
    return promise
  }

  deleteGroup(id: String): Promise<ProductSupplier> {
    let promise = this.http.post('/api/categories/category/delete/' + id).toPromise();
    promise.then(value => this.loadProductCategories());
    return promise
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

  loadProductCategories(): Subject<{ [key: string]: ProductCategory }> {
    this.http.get('/api/categories/list')
      .pipe(
        first(),
        map(result => result || []),
        map(result => modelsToMap(result as ProductCategory[])),
      )
      .subscribe(
        value => {
          this.needLoad = false;
          this.categories$.next(value)
        },
        value => this.categories$.error(value.message),
      )
    return this.categories$;
  }


}




