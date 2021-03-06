import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../catalogue.models";
import {ViewState} from "../../../shared/model/view-state.model";
import {ProductCategoryService} from "../product-category.service";
import {mapToViewStates} from "../../../shared/utils";

@Component({
  selector: 'app-product-categories-tree',
  templateUrl: './product-categories-tree.component.html',
  styleUrls: ['./product-categories-tree.component.scss']
})
export class ProductCategoriesTreeComponent implements OnInit {
  @Input() categories: ProductCategory[] = []
  states: { [key: string]: ViewState } = {};

  constructor(private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    let flat = this.untree(this.categories);
    this.states = mapToViewStates(flat);
  }

  deleteGroup(category: ProductCategory) {
    let state = this.states[category.id];
    state?.inProgress();
    this.productCategoryService.deleteCategory(category.id)
      .then(
        (result) => state?.ready(),
        (error) => state?.error(error.message),
      )
  }

  untree(categories: ProductCategory[]): ProductCategory[] {
    let result: ProductCategory[] = [];
    for (const g of categories) {
      result.push(g);
      if (g.categories?.length) {
        result.concat(this.untree(g.categories));
      }
    }
    return result;
  }

}
