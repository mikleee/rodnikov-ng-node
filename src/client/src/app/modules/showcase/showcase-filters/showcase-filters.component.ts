import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductSupplier} from "../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-filters',
  templateUrl: './showcase-filters.component.html',
  styleUrls: ['./showcase-filters.component.scss']
})
export class ShowcaseFiltersComponent implements OnInit {
  @Input() suppliers: ProductSupplier[] = [];
  @Input() products: Product[] = [];

  @Output() filtersChange: EventEmitter<ShowcaseFilters> = new EventEmitter<ShowcaseFilters>();

  filters: ShowcaseFilters = new ShowcaseFilters();

  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
    this.filtersChange.emit(this.filters);
  }

  selectedSuppliersChange(value: string[] = []) {
    let hash = this.filters.hash();
    this.filters.suppliers = value;
    if (hash !== this.filters.hash()) {
      this.filtersChange.emit(this.filters);
    }
  }

}

export class ShowcaseFilters {
  suppliers: string[] = [];
  priceMin: number | undefined;
  priceMax: number | undefined;

  hash() {
    return [
      this.priceMin,
      this.priceMax,
      this.suppliers.length,
      this.suppliers.sort().join('|')
    ].join('--')
  }

  isEmpty() {
    return this.priceMin === undefined
      && this.priceMax === undefined
      && this.suppliers.length === 0
  }

  equals(that: ShowcaseFilters) {
    return that && that.hash() === this.hash();
  }

}
