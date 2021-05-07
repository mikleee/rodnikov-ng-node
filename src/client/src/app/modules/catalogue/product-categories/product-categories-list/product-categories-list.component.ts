import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductCategory} from "../../catalogue.models";
import {Subscription} from "rxjs";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {AsyncModel, toAsyncModels} from "../../../shared/model/async.model";
import {ProductCategoryService} from "../product-category.service";


@Component({
  selector: 'app-product-categories-list',
  templateUrl: './product-categories-list.component.html',
  styleUrls: ['./product-categories-list.component.scss']
})
export class ProductCategoriesListComponent implements OnInit, OnDestroy {
  categories$?: Subscription;
  categories: AsyncModel<AsyncModel<ProductCategory>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);
  tree: ProductCategory[] = [];

  individualStates: { [key: string]: ViewState } = {};

  constructor(private productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.categories.state.inProgress();
    this.categories$ = this.productCategoryService.getProductCategories()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups({}, ViewStateState.ERROR, error),
      );
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe();
  }

  deleteGroup(category: AsyncModel<ProductCategory>) {
    category.state.inProgress();
    this.productCategoryService.deleteGroup(category.value.id)
      .then(
        (result) => category.state.ready(),
        (error) => category.state.error(error.message),
      )
  }

  resolveGroups(value: { [key: string]: ProductCategory }, state: ViewStateState, message: string | undefined) {
    let values = Object.values(value);
    this.categories = new AsyncModel(state, toAsyncModels(values), message)
    this.tree = this.productCategoryService.buildTree(values);
  }


}
