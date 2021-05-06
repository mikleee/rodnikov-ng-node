import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductSuppliersService} from "../../../catalogue/product-suppliers/product-suppliers.service";
import {first} from "rxjs/operators";
import {ProductSupplier} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-supplier-filters',
  templateUrl: './showcase-supplier-filters.component.html',
  styleUrls: ['./showcase-supplier-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcaseSupplierFiltersComponent implements OnInit {
  suppliersState: ViewState = new ViewState();
  suppliers: { [key: string]: ProductSupplierFilter } = {}


  constructor(private productSupplierService: ProductSuppliersService) {
  }

  ngOnInit(): void {
    this.productSupplierService.getSuppliers()
      .pipe(
        first()
      )
      .subscribe(
        result => this.resolveSuppliers(result, ViewStateState.READY, undefined),
        error => this.resolveSuppliers({}, ViewStateState.ERROR, error),
      );

  }

  resolveSuppliers(value: { [key: string]: ProductSupplier }, state: ViewStateState, message: string | undefined) {
    this.suppliersState.setState(state);
    this.suppliersState.setMessage(message);
    this.suppliers = value as { [key: string]: ProductSupplierFilter };
  }


}

interface ProductSupplierFilter extends ProductSupplier {
  checked: boolean;
}
