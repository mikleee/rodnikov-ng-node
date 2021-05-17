import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../../catalogue/catalogue.models";
import {Sort} from "../../shared/model/sort.model";
import {compareNumbers, compareStringsIgnoreCase} from "../../shared/utils";

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

  setSort(sort: Sort = new Sort()): void {
    this.update((filters) => {
      filters.sort = sort;
    })
  }

  setPriceRange(min: number | undefined, max: number | undefined,) {
    this.update((filters) => {
      filters.priceMin = min;
      filters.priceMax = max;
    })
  }

  setAttributes(attributes: { [key: string]: string[] } = {}) {
    this.update((filters) => {
      let attributesToCheck: { [key: string]: string[] } = {};
      for (const [template, values] of Object.entries(attributes)) {
        if (values && values.length) {
          attributesToCheck[template] = values;
        }
      }
      filters.attributes = attributesToCheck;
    })
  }

  applyOnProducts(products: Product[] = [], filters: ShowcaseFilters) {
    let result = [...products];

    if (filters.sort && filters.sort.property) {
      result = this.sort(products, filters.sort);
    }

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
    if (filters.attributes !== undefined) {
      result = result.filter(p => this.matchAttributeFilters(p, filters.attributes));
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

  private matchAttributeFilters(product: Product, attributes: { [key: string]: string[] }) {
    let productsAttributes: { [key: string]: string } = {};
    product.attributes.forEach(attr => {
      productsAttributes[attr.template] = attr.value;
    })

    for (const [template, values] of Object.entries(attributes)) {
      if (!Object.keys(productsAttributes).includes(template)) {
        return false;
      }
      let attributeValue: string = productsAttributes[template];
      if (!values.includes(attributeValue)) {
        return false;
      }
    }

    return true;
  }

  private sort(products: Product[], sort: Sort) {
    let comparator: any;
    switch (sort.property) {
      case 'name':
        comparator = (p1: Product, p2: Product): number => compareStringsIgnoreCase(p1.name, p2.name)
        break;
      case 'price' :
        comparator = (p1: Product, p2: Product): number => compareNumbers(p1.priceUah, p2.priceUah)
        break;
    }
    if (comparator) {
      const direction = sort.direction === 'asc' ? 1 : -1;
      products = products.sort((p1, p2) => {
        return direction * comparator(p1, p2)
      })
    }
    return products;
  }

}

export class ShowcaseFilters {
  sort: Sort = new Sort();
  suppliers: string[] = [];
  priceMin: number | undefined;
  priceMax: number | undefined;
  attributes: { [key: string]: string[] } = {}

  hash() {
    let attributes = [];
    for (const [k, v] of Object.entries(this.attributes)) {
      attributes.push(`${k}=${v.sort().join('*')}`)
    }

    return [
      this.sort?.property,
      this.sort?.direction,
      this.priceMin,
      this.priceMax,
      this.suppliers.length,
      this.suppliers.sort().join('|'),
      attributes.length,
      attributes.sort().join('|'),
    ].join('--')
  }

  isEmpty() {
    return this.priceMin === undefined
      && this.priceMax === undefined
      && this.suppliers.length === 0
      && Object.keys(this.attributes).length === 0
  }

  equals(that: ShowcaseFilters) {
    return that && that.hash() === this.hash();
  }

}

