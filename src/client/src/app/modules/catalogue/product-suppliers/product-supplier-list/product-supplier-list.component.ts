import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductSupplier} from "../../catalogue.models";
import {AsyncModel} from "../../../shared/model/async.model";
import {ViewStateState} from "../../../shared/model/view-state.model";
import {Subscription} from "rxjs";
import {ProductSuppliersService} from "../product-suppliers.service";
import {first, map} from "rxjs/operators";
import {Pagination} from "../../../shared/model/pagination.model";
import {toAsyncModels} from "../../../shared/utils";

@Component({
  selector: 'app-product-supplier-list',
  templateUrl: './product-supplier-list.component.html',
  styleUrls: ['./product-supplier-list.component.scss']
})
export class ProductSupplierListComponent implements OnInit, OnDestroy {
  pagination: Pagination = new Pagination();
  suppliers$?: Subscription;
  suppliers: AsyncModel<AsyncModel<ProductSupplier>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);
  suppliersToShow: AsyncModel<ProductSupplier>[] = [];

  constructor(private suppliersService: ProductSuppliersService) {

  }


  deleteSupplier(supplier: AsyncModel<ProductSupplier>) {
    supplier.state.inProgress();
    this.suppliersService.deleteSupplier(supplier.value.id)
      .then(
        (result) => {
          let suppliers = this.suppliers.value.filter(v => v.value.id != supplier.value.id);
          this.resolveSuppliers(suppliers, ViewStateState.READY, undefined);
          supplier.state.ready()
        },
        (error) => supplier.state.error(error.message),
      )
  }

  ngOnInit(): void {
    this.suppliers.state.inProgress();
    this.suppliers$ = this.suppliersService.getSuppliers()
      .pipe(
        first(),
        map(v => toAsyncModels(Object.values(v)))
      )
      .subscribe(
        result => this.resolveSuppliers(result, ViewStateState.READY),
        error => this.resolveSuppliers([], ViewStateState.ERROR, error)
      )
  }

  ngOnDestroy(): void {
    this.suppliers$?.unsubscribe();
  }

  resolveSuppliers(value: AsyncModel<ProductSupplier>[], state: ViewStateState, message?: string) {
    this.suppliers = new AsyncModel(state, value, message);
    this.suppliersToShow = this.pagination.getPage(value);
  }


}
