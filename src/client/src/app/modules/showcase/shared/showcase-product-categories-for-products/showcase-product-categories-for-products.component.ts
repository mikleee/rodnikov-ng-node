import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product, ProductCategory} from "../../../catalogue/catalogue.models";
import {toMap} from "../../../shared/utils";

@Component({
  selector: 'app-showcase-products-categories-for-products',
  templateUrl: './showcase-product-categories-for-products.component.html',
  styleUrls: ['./showcase-product-categories-for-products.component.scss']
})
export class ShowcaseProductCategoriesForProductsComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() categories: ProductCategory[] = [];

  topCategories: ProductCategory[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initTopCategories(this.products, this.categories);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTopCategories(
      changes.products ? changes.products.currentValue : this.products,
      changes.categories ? changes.categories.currentValue : this.categories
    );
  }

  initTopCategories(products: Product[] = [], categories: ProductCategory[] = []) {
    let distinct: string[] = [];
    for (const product of products) {
      if (!distinct.includes(product.category)) {
        distinct.push(product.category);
      }
    }

    let categoriesMap = toMap(categories);

    let result: ProductCategory[] = [];

    for (const id of distinct) {
      let category = categoriesMap[id];
      if (!category) {
        continue;
      }

      let rest = distinct.filter(i => i != id);


      let parent = category.parent;
      let fits = true;
      while (parent) {
        if (rest.includes(parent)) {
          fits = false;
          break;
        }
        parent = categoriesMap[parent].parent;
      }

      if (fits) {
        category.categories = (function excludeExtraNodes(categories) {
          let result: ProductCategory[] = [];
          for (const sub of categories) {
            if (distinct.includes(sub.id)) {
              sub.categories = excludeExtraNodes(sub.categories);
              result.push(sub);
            } else {
              let toAssign = excludeExtraNodes(sub.categories);
              result = result.concat(toAssign);
            }
          }
          return result;
        })(category.categories);

        result.push(category);
      }
    }

    this.topCategories = result;
  }


}
