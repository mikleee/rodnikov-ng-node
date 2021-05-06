import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductGroup} from "../../catalogue.models";
import {ProductGroupService} from "../product-group.service";

@Component({
  selector: 'app-product-group-dropdown',
  templateUrl: './product-group-dropdown.component.html',
  styleUrls: ['./product-group-dropdown.component.scss']
})
export class ProductGroupDropdownComponent implements OnInit {
  @Input() nullOption?: string;
  @Input() selectId: string = Math.random().toString();
  @Input() group?: string;
  @Output() groupChange = new EventEmitter<ProductGroup>();

  groups$?: Subscription;
  groupsState = new ViewState();
  groups: { [key: string]: ProductGroup } = {};

  constructor(protected productGroupService: ProductGroupService) {

  }

  ngOnInit(): void {
    this.groupsState.inProgress();
    this.groups$ = this.productGroupService.getProductGroups()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups({}, ViewStateState.ERROR, error)
      );
  }

  onChange() {
    const group = this.group ? this.groups[this.group] : undefined;
    this.groupChange.emit(group);
  }

  ngOnDestroy(): void {
    this.groups$?.unsubscribe();
  }

  resolveGroups(value: { [key: string]: ProductGroup }, state: ViewStateState, message: string | undefined) {
    this.groupsState.setState(state);
    this.groupsState.setMessage(message);
    this.groups = value;
  }

}
