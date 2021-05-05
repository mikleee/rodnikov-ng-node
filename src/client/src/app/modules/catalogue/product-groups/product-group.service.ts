import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpService} from "../../shared/service/http.service";
import {ProductGroup, ProductSupplier} from "../catalogue.models";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ProductGroupService {
  private groups = new Subject<ProductGroup[]>();

  constructor(private http: HttpService) {

  }

  loadProductGroups(): Subject<ProductGroup[]> {
    this.http.get('/api/groups/list')
      .pipe(map(result => result || []))
      .subscribe(
        value => this.groups.next(this.assignSubgroups(value)),
        value => this.groups.error(value.message),
      )
    return this.groups;
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
    const idMapping = new Map<string, ProductGroup>();
    const parentChildMapping = new Map<string, string[]>();

    input?.forEach(g => {
      result.push(g as ProductGroup);
      idMapping.set(g.id, g);

      if (g.parent) {
        let arr = parentChildMapping.get(g.parent) || [];
        arr.push(g.id);
        parentChildMapping.set(g.parent, arr);
      }
    });

    result.forEach(g => {
      g.groups = (parentChildMapping.get(g.id) || []).map(c => idMapping.get(c) as ProductGroup);
    });
    debugger;
    return result;
  }


}




