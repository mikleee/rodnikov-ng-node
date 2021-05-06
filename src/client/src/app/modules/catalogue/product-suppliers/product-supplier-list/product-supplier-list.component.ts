import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductSupplier} from "../../catalogue.models";
import {AsyncModel, toAsyncModels} from "../../../shared/model/async.model";
import {ViewStateState} from "../../../shared/model/view-state.model";
import {Subscription} from "rxjs";
import {ProductSuppliersService} from "../product-suppliers.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-product-supplier-list',
  templateUrl: './product-supplier-list.component.html',
  styleUrls: ['./product-supplier-list.component.scss']
})
export class ProductSupplierListComponent implements OnInit, OnDestroy {
  suppliers$?: Subscription;
  suppliers: AsyncModel<AsyncModel<ProductSupplier>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);

  constructor(private suppliersService: ProductSuppliersService) {

  }


  deleteSupplier(supplier: AsyncModel<ProductSupplier>) {
    supplier.state.inProgress();
    this.suppliersService.deleteSupplier(supplier.value.id)
      .then(
        (result) => supplier.state.ready(),
        (error) => supplier.state.error(error.message),
      )
  }

  ngOnInit(): void {
    this.suppliers.state.inProgress();
    this.suppliers$ = this.suppliersService.getSuppliers()
      .pipe(
        map(v => toAsyncModels(Object.values(v)))
      )
      .subscribe(
        result => this.suppliers = new AsyncModel(ViewStateState.READY, result),
        error => this.suppliers = new AsyncModel(ViewStateState.ERROR, [], error)
      )
  }

  ngOnDestroy(): void {
    this.suppliers$?.unsubscribe();
  }


}
