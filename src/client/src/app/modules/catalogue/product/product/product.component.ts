import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AsyncModel} from "../../../shared/model/async.model";
import {ProductSupplier} from "../../catalogue.models";
import {ViewStateState} from "../../../shared/model/view-state.model";
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$?: Subscription;
  products: AsyncModel<AsyncModel<ProductSupplier>[]> = new AsyncModel<AsyncModel<ProductSupplier>[]>(ViewStateState.UNTOUCHED, []);

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
    this.products.state.inProgress();
    this.products$ = this.suppliersService.loadSuppliers()
      .subscribe(
        result => {
          this.products.state.ready();
          this.products.value = result.map((v) => new AsyncModel<ProductSupplier>(ViewStateState.UNTOUCHED, v));
        },
        error => this.products = new AsyncModel<AsyncModel<ProductSupplier>[]>(ViewStateState.ERROR, [], error)
      );
  }

  ngOnDestroy(): void {
    this.products$?.unsubscribe();
  }
}
