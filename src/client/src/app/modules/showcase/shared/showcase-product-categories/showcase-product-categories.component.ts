import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../../catalogue/catalogue.models";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductCategoryService} from "../../../catalogue/product-categories/product-category.service";
import {toMap} from "../../../shared/utils";

@Component({
  selector: 'app-showcase-product-categories',
  templateUrl: './showcase-product-categories.component.html',
  styleUrls: ['./showcase-product-categories.component.scss']
})
export class ShowcaseProductCategoriesComponent implements OnInit {
  categoriesTree: ProductCategory[] = [];
  state: ViewState = new ViewState();

  constructor(private productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.state.inProgress();
    this.productCategoryService.getProductCategories()
      .subscribe(
        result => this.resolveCategories(toMap(result), ViewStateState.READY, undefined),
        error => this.resolveCategories({}, ViewStateState.ERROR, error),
      );
  }


  resolveCategories(value: { [key: string]: ProductCategory }, state: ViewStateState, message: string | undefined) {
    this.state.setState(state);
    this.state.setMessage(message);
    let values = Object.values(value);
    this.categoriesTree = this.productCategoryService.buildTree(values);
  }

}
