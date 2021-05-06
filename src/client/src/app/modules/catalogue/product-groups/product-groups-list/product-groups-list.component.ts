import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductGroup} from "../../catalogue.models";
import {ProductGroupService} from "../product-group.service";
import {Subscription} from "rxjs";
import {mapToViewStates, ViewState, ViewStateState} from "../../../shared/model/view-state.model";

@Component({
  selector: 'app-product-groups-list',
  templateUrl: './product-groups-list.component.html',
  styleUrls: ['./product-groups-list.component.scss']
})
export class ProductGroupsListComponent implements OnInit, OnDestroy {
  groups$?: Subscription;
  groupsState = new ViewState();
  groups: ProductGroup[] = [];
  tree: ProductGroup[] = [];

  individualStates: { [key: string]: ViewState } = {};

  constructor(private productGroupService: ProductGroupService) {

  }


  ngOnInit(): void {
    this.groupsState.inProgress();
    this.groups$ = this.productGroupService.getProductGroups()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups([], ViewStateState.ERROR, error)
      );
  }

  ngOnDestroy(): void {
    this.groups$?.unsubscribe();
  }


  deleteGroup(group: ProductGroup) {
    let state = this.individualStates[group.id];
    state?.inProgress();
    this.productGroupService.deleteGroup(group.id)
      .then(
        (result) => state?.ready(),
        (error) => state?.error(error.message),
      )
  }

  resolveGroups(value: ProductGroup[], state: ViewStateState, message: string | undefined) {
    this.groupsState.setState(state);
    this.groupsState.setMessage(message);
    this.groups = value;
    this.tree = this.productGroupService.buildTree(value);
    this.individualStates = mapToViewStates(value);
  }


}
