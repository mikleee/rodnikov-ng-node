import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {ProductGroup, ProductSupplier} from "../catalogue.models";
import {first, map} from "rxjs/operators";
import {modelsToMap} from "../../shared/model/base.model";


@Injectable({providedIn: "root"})
export class ProductGroupService {
  private groups$ = new ReplaySubject<{ [key: string]: ProductGroup }>();
  private needLoad = true;

  constructor(private http: HttpService) {

  }

  getProductGroups(): Observable<{ [key: string]: ProductGroup }> {
    if (this.needLoad) {
      this.loadProductGroups();
    }
    return this.groups$;
  }

  getProductGroupsTree(): Observable<ProductGroup[]> {
    return this.groups$.pipe(
      map(value => this.buildTree(Object.values(value)))
    );
  }

  getProductGroup(id: String): Promise<ProductGroup> {
    return this.http.get('/api/groups/group/' + id).toPromise();
  }

  submitProductGroup(supplier: ProductGroup): Promise<ProductGroup> {
    let promise = this.http.post('/api/groups/group/submit', supplier).toPromise();
    promise.then(value => this.loadProductGroups());
    return promise
  }

  deleteGroup(id: String): Promise<ProductSupplier> {
    let promise = this.http.post('/api/groups/group/delete/' + id).toPromise();
    promise.then(value => this.loadProductGroups());
    return promise
  }

  assignSubgroups(input: ProductGroup[]): ProductGroup[] {
    const result: ProductGroup[] = [];

    const idMapping: { [key: string]: ProductGroup } = {};
    const parentChildMapping: { [key: string]: string[] } = {};

    input?.forEach(g => {
      result.push(g as ProductGroup);
      idMapping[g.id] = g;

      if (g.parent) {
        let arr = parentChildMapping[g.parent] || [];
        arr.push(g.id);
        parentChildMapping[g.parent] = arr;
      }
    });

    result.forEach(g => {
      g.groups = (parentChildMapping[g.id] || []).map(c => idMapping[c] as ProductGroup);
    });
    return result;
  }

  buildTree(input: ProductGroup[]): ProductGroup[] {
    return this.assignSubgroups(input).filter(g => !g.parent);
  }

  loadProductGroups(): Subject<{ [key: string]: ProductGroup }> {
    this.http.get('/api/groups/list')
      .pipe(
        first(),
        map(result => result || []),
        map(result => modelsToMap(result as ProductGroup[])),
      )
      .subscribe(
        value => {
          this.needLoad = false;
          this.groups$.next(value)
        },
        value => this.groups$.error(value.message),
      )
    return this.groups$;
  }


}




