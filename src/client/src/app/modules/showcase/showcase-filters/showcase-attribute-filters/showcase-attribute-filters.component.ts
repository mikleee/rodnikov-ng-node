import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../../catalogue/catalogue.models";
import {ShowcaseFiltersService} from "../showcase-filters.service";
import {addToBundle} from "../../../shared/utils";

@Component({
  selector: 'app-showcase-attribute-filters',
  templateUrl: './showcase-attribute-filters.component.html',
  styleUrls: ['./showcase-attribute-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcaseAttributeFiltersComponent implements OnInit, OnChanges {
  @Input('products') products: Product[] = [];
  filters: ShowcaseAttributeFilter[] = [];

  constructor(private showcaseFiltersService: ShowcaseFiltersService) {
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.initAttributeFilters(changes.products.currentValue)
    }
  }

  initAttributeFilters(products: Product[] = []) {
    let map: { [key: string]: ShowcaseAttributeFilter } = {};
    products.forEach(p => {
      for (const attr of p.attributes) {
        let attributeFilter = map[attr.template];
        if (!attributeFilter) {
          attributeFilter = new ShowcaseAttributeFilter();
          attributeFilter.name = attr.name;
          attributeFilter.template = attr.template;
          map[attr.template] = attributeFilter;
        }

        if (attr.value !== undefined) {
          let attributeFilterValue = attributeFilter.values.filter(v => v.value === attr.value)[0];
          if (!attributeFilterValue) {
            attributeFilterValue = new ShowcaseAttributeFilterValue();
            attributeFilterValue.value = attr.value;
            attributeFilter.values.push(attributeFilterValue);
          }
          attributeFilterValue.productsCount++;
        }
        attributeFilter.productsCount++;
      }
    });

    this.filters = Object.values(map);
  }


  onAttributeFilterChange() {
    let checked = {};
    this.filters.forEach(f => {
      f.values
        .filter(fv => fv.checked)
        .forEach(fv => addToBundle(checked, f.template as string, fv.value))
    });
    this.showcaseFiltersService.setAttributes(checked);
  }


}

export class ShowcaseAttributeFilter {
  name?: string;
  template?: string;
  values: ShowcaseAttributeFilterValue[] = [];
  productsCount: number = 0;
}

export class ShowcaseAttributeFilterValue {
  value: string | undefined;
  productsCount: number = 0;
  checked: boolean = false;
}
