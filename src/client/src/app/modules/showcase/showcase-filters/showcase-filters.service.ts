import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../../catalogue/catalogue.models";

@Injectable({
  providedIn: 'root'
})
export class ShowcaseFiltersService {
  filters$: BehaviorSubject<ShowcaseFilters> = new BehaviorSubject<ShowcaseFilters>(new ShowcaseFilters());


  constructor() {
  }

  setSuppliers(suppliers: string[] = []) {
    this.update((filters) => filters.suppliers = suppliers)
  }

  setPriceRange(min: number | undefined, max: number | undefined,) {
    this.update((filters) => {
      filters.priceMin = min;
      filters.priceMax = max;
    })
  }

  applyOnProducts(products: Product[] = [], filters: ShowcaseFilters) {
    let result = products;
    if (filters.suppliers?.length) {
      result = products.filter(p => filters.suppliers.includes(p.supplier));
    }
    if (filters.priceMin !== undefined) {
      let value = filters.priceMin;
      result = result.filter(p => p.priceUah >= value);
    }
    if (filters.priceMax !== undefined) {
      let value = filters.priceMax;
      result = result.filter(p => p.priceUah <= value);
    }
    return result;
  }

  resetFilters() {
    this.filters$.next(new ShowcaseFilters());
  }

  private update(callback: (filters: ShowcaseFilters) => any) {
    let filters = this.filters$.getValue();
    let hash = filters.hash();
    callback(filters);
    if (hash !== filters.hash()) {
      this.filters$.next(filters);
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

