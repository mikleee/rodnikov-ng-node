import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductSupplier} from "../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-filters',
  templateUrl: './showcase-filters.component.html',
  styleUrls: ['./showcase-filters.component.scss']
})
export class ShowcaseFiltersComponent implements OnInit {
  @Input() suppliers: ProductSupplier[] = [];
  @Input() products: Product[] = [];

  disabled = false;

  constructor() {
  }

  ngOnInit(): void {
  }


}
