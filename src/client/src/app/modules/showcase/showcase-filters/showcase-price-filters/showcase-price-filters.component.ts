import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-price-filters',
  templateUrl: './showcase-price-filters.component.html',
  styleUrls: ['./showcase-price-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcasePriceFiltersComponent implements OnInit, OnChanges {
  @Input() products?: Product[] = [];
  range: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initRange(changes.products.currentValue);
  }

  initRange(products: Product[]) {
    this.products = products;
    this.range = [];
    products.forEach(p => {
      let priceUah = Number(p.priceUah.toFixed(2));
      if (!this.range.includes(priceUah)) {
        this.range.push(priceUah);
      }
    });
    this.range.sort((p1, p2) => p1 - p2);
  }


}
