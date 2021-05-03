import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncModel} from "../../../shared/model/async.model";
import {ProductSupplier} from "../../catalogue.models";
import {ProductGroupService} from "../product-group.service";
import {ProductGroupsBaseComponent} from "../product-groups-base.component";

@Component({
  selector: 'app-product-groups-list',
  templateUrl: './product-groups-list.component.html',
  styleUrls: ['./product-groups-list.component.scss']
})
export class ProductGroupsListComponent extends ProductGroupsBaseComponent implements OnInit, OnDestroy {

  constructor(protected productGroupService: ProductGroupService) {
    super(productGroupService);
  }


  deleteGroup(supplier: AsyncModel<ProductSupplier>) {
    supplier.state.inProgress();
    this.productGroupService.deleteGroup(supplier.value.id)
      .then(
        (result) => supplier.state.ready(),
        (error) => supplier.state.error(error.message),
      )
  }

}
