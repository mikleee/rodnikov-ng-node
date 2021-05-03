import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductSupplier} from "../../catalogue.models";
import {AsyncModel} from "../../../shared/model/async.model";
import {ViewStateState} from "../../../shared/model/view-state.model";
import {Subscription} from "rxjs";
import {ProductSuppliersService} from "../product-suppliers.service";

@Component({
  selector: 'app-product-supplier-list',
  templateUrl: './product-supplier-list.component.html',
  styleUrls: ['./product-supplier-list.component.scss']
})
export class ProductSupplierListComponent implements OnInit, OnDestroy {
  suppliers$?: Subscription;
  suppliers: AsyncModel<AsyncModel<ProductSupplier>[]> = new AsyncModel<AsyncModel<ProductSupplier>[]>(ViewStateState.UNTOUCHED, []);

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
    this.suppliers$ = this.suppliersService.loadSuppliers()
      .subscribe(
        result => {
          this.suppliers.state.ready();
          this.suppliers.value = result.map((v) => new AsyncModel<ProductSupplier>(ViewStateState.UNTOUCHED, v));
        },
        error => this.suppliers = new AsyncModel<AsyncModel<ProductSupplier>[]>(ViewStateState.ERROR, [], error)
      );
  }

  ngOnDestroy(): void {
    this.suppliers$?.unsubscribe();
  }

}
