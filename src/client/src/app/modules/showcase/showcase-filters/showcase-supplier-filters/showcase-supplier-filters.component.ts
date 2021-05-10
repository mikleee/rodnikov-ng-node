import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductSuppliersService} from "../../../catalogue/product-suppliers/product-suppliers.service";
import {first} from "rxjs/operators";
import {ProductSupplier} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-supplier-filters',
  templateUrl: './showcase-supplier-filters.component.html',
  styleUrls: ['./showcase-supplier-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcaseSupplierFiltersComponent implements OnInit, OnChanges {
  @Input('suppliers') suppliers_?: ProductSupplier[];

  suppliers: ProductSupplierFilter[] = [];
  state: ViewState = new ViewState();


  constructor(private productSupplierService: ProductSuppliersService) {
  }

  ngOnInit(): void {
    if (this.suppliers_) {
      this.resolveSuppliers(this.suppliers_, ViewStateState.READY, undefined)
    } else {
      this.productSupplierService.getSuppliers()
        .pipe(
          first()
        )
        .subscribe(
          result => this.resolveSuppliers(result, ViewStateState.READY, undefined),
          error => this.resolveSuppliers([], ViewStateState.ERROR, error),
        )
    }
  }

  resolveSuppliers(value: ProductSupplier[], state: ViewStateState, message: string | undefined) {
    this.state.setState(state);
    this.state.setMessage(message);
    this.suppliers = value as ProductSupplierFilter[];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resolveSuppliers(changes.suppliers_.currentValue, ViewStateState.READY, undefined)
  }


}

interface ProductSupplierFilter extends ProductSupplier {
  checked: boolean;
}
