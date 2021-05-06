import {Component, Input, OnInit} from '@angular/core';
import {ProductGroup} from "../../catalogue.models";
import {mapToViewStates, ViewState} from "../../../shared/model/view-state.model";
import {ProductGroupService} from "../product-group.service";

@Component({
  selector: 'app-product-groups-tree',
  templateUrl: './product-groups-tree.component.html',
  styleUrls: ['./product-groups-tree.component.scss']
})
export class ProductGroupsTreeComponent implements OnInit {
  @Input() groups: ProductGroup[] = []
  states: { [key: string]: ViewState } = {};

  constructor(private productGroupService: ProductGroupService) {
  }

  ngOnInit(): void {
    let flat = this.untree(this.groups);
    this.states = mapToViewStates(flat);
  }

  deleteGroup(group: ProductGroup) {
    let state = this.states[group.id];
    state?.inProgress();
    this.productGroupService.deleteGroup(group.id)
      .then(
        (result) => state?.ready(),
        (error) => state?.error(error.message),
      )
  }

  untree(groups: ProductGroup[]): ProductGroup[] {
    let result: ProductGroup[] = [];
    for (const g of groups) {
      result.push(g);
      if (g.groups.length) {
        result.concat(this.untree(g.groups));
      }
    }
    return result;
  }

}
