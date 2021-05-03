import {Subscription} from "rxjs";
import {AsyncModel} from "../../shared/model/async.model";
import {ProductGroup} from "../catalogue.models";
import {ProductGroupService} from "./product-group.service";
import {ViewStateState} from "../../shared/model/view-state.model";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductGroupsBaseComponent {
  groups$?: Subscription;
  groups: AsyncModel<AsyncModel<ProductGroup>[]> = new AsyncModel<AsyncModel<ProductGroup>[]>(ViewStateState.UNTOUCHED, []);

  constructor(protected productGroupService: ProductGroupService) {

  }


  ngOnInit(): void {
    this.groups.state.inProgress();
    this.groups$ = this.productGroupService.loadProductGroups()
      .subscribe(
        result => {
          this.groups.state.ready();
          this.groups.value = result.map((v) => new AsyncModel<ProductGroup>(ViewStateState.UNTOUCHED, v));
        },
        error => this.groups = new AsyncModel<AsyncModel<ProductGroup>[]>(ViewStateState.ERROR, [], error)
      );
  }

  ngOnDestroy(): void {
    this.groups$?.unsubscribe();
  }

}
