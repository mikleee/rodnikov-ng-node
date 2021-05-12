import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Product, ProductSupplier} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-supplier-filters',
  templateUrl: './showcase-supplier-filters.component.html',
  styleUrls: ['./showcase-supplier-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcaseSupplierFiltersComponent implements OnInit, OnChanges {
  @Input('suppliers') suppliers: ProductSupplier[] = [];
  @Input('products') products: Product[] = [];

  @Output() selectedSuppliersChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  supplierFilters: ProductSupplierFilter[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  resolveSuppliers(suppliers: ProductSupplier[], products: Product[]) {
    this.supplierFilters = suppliers as ProductSupplierFilter[];

    if (products.length) {
      let counts: { [key: string]: number } = products.reduce((acc, product) => {
        acc[product.supplier] = (acc[product.supplier] ?? 0) + 1;
        return acc;
      }, {} as { [key: string]: number })

      for (const supplier of this.supplierFilters) {
        supplier.productsCount = counts[supplier.id] ?? 0;
      }
    }
  }

  onSupplierFilterChange() {
    this.selectedSuppliersChange.emit(
      this.supplierFilters
        .filter(f => f.checked)
        .map(f => f.id)
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resolveSuppliers(this.suppliers, this.products);
  }

}

interface ProductSupplierFilter extends ProductSupplier {
  checked: boolean;
  productsCount: number;
}
