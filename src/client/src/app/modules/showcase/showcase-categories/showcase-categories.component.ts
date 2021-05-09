import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../catalogue/catalogue.models";
import {ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {ProductCategoryService} from "../../catalogue/product-categories/product-category.service";
import {toMap} from "../../shared/utils";

@Component({
  selector: 'app-showcase-categories',
  templateUrl: './showcase-categories.component.html',
  styleUrls: ['./showcase-categories.component.scss']
})
export class ShowcaseCategoriesComponent implements OnInit {
  categoriesTree: ProductCategory[] = [];
  categoriesTreeState: ViewState = new ViewState();
  stack: Stack = new Stack();
  lookupChildren = false;
  activeCategory?: ProductCategory;

  constructor(private productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.categoriesTreeState.inProgress();
    this.productCategoryService.getProductCategories()
      .subscribe(
        result => this.resolveCategories(toMap(result), ViewStateState.READY, undefined),
        error => this.resolveCategories({}, ViewStateState.ERROR, error),
      );
  }


  resolveCategories(value: { [key: string]: ProductCategory }, state: ViewStateState, message: string | undefined) {
    this.categoriesTreeState.setState(state);
    this.categoriesTreeState.setMessage(message);
    let values = Object.values(value);
    this.categoriesTree = this.productCategoryService.buildTree(values);
  }

  debugLog(o: any) {
    console.log(o);
  }

}

export class Stack {
  value: number = 0;

  increase() {
    this.value++;
  }

  decrease() {
    this.value--;
  }

  waitAndDecrease() {
    setTimeout(() => this.decrease(), 1000);
  }


}
