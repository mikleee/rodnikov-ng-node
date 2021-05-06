import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductGroup} from "../../catalogue.models";
import {ProductGroupService} from "../product-group.service";
import {Subscription} from "rxjs";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {AsyncModel, toAsyncModels} from "../../../shared/model/async.model";

@Component({
  selector: 'app-product-groups-list',
  templateUrl: './product-groups-list.component.html',
  styleUrls: ['./product-groups-list.component.scss']
})
export class ProductGroupsListComponent implements OnInit, OnDestroy {
  groups$?: Subscription;
  groups: AsyncModel<AsyncModel<ProductGroup>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);
  tree: ProductGroup[] = [];

  individualStates: { [key: string]: ViewState } = {};

  constructor(private productGroupService: ProductGroupService) {

  }

  ngOnInit(): void {
    this.groups.state.inProgress();
    this.groups$ = this.productGroupService.getProductGroups()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups({}, ViewStateState.ERROR, error),
      );
  }

  ngOnDestroy(): void {
    this.groups$?.unsubscribe();
  }

  deleteGroup(group: AsyncModel<ProductGroup>) {
    group.state.inProgress();
    this.productGroupService.deleteGroup(group.value.id)
      .then(
        (result) => group.state.ready(),
        (error) => group.state.error(error.message),
      )
  }

  resolveGroups(value: { [key: string]: ProductGroup }, state: ViewStateState, message: string | undefined) {
    let values = Object.values(value);
    this.groups = new AsyncModel(state, toAsyncModels(values), message)
    this.tree = this.productGroupService.buildTree(values);
  }


}
