import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ProductCategory} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-product-categories-layout',
  templateUrl: './showcase-product-categories-layout.component.html',
  styleUrls: ['./showcase-product-categories-layout.component.scss']
})
export class ShowcaseProductCategoriesLayoutComponent implements OnInit {

  @Input() categories: ProductCategory[] = [];

  activeCategory?: ProductCategory;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
