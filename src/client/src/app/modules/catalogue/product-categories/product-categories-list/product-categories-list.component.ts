import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductCategory} from "../../catalogue.models";
import {Subscription} from "rxjs";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {AsyncModel} from "../../../shared/model/async.model";
import {ProductCategoryService} from "../product-category.service";
import {Pagination} from "../../../shared/model/pagination.model";
import {toAsyncModels} from "../../../shared/utils";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-product-categories-list',
  templateUrl: './product-categories-list.component.html',
  styleUrls: ['./product-categories-list.component.scss']
})
export class ProductCategoriesListComponent implements OnInit, OnDestroy {
  pagination: Pagination = new Pagination();
  categories$?: Subscription;
  categories: AsyncModel<AsyncModel<ProductCategory>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);
  tree: ProductCategory[] = [];
  categoriesToShow: AsyncModel<ProductCategory>[] = [];

  individualStates: { [key: string]: ViewState } = {};

  constructor(private productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.categories.state.inProgress();
    this.categories$ = this.productCategoryService.getProductCategories()
      .pipe(
        first(),
      )
      .subscribe(
        result => this.resolveCategories(result, ViewStateState.READY, undefined),
        error => this.resolveCategories([], ViewStateState.ERROR, error),
      );
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe();
  }

  deleteCategory(category: AsyncModel<ProductCategory>) {
    category.state.inProgress();
    this.productCategoryService.deleteCategory(category.value.id)
      .then(
        (result) => {
          let categories = this.categories.value
            .filter(v => v.value.id != category.value.id)
            .map(v => v.value);
          this.resolveCategories(categories, ViewStateState.READY, undefined);
          category.state.ready();
        },
        (error) => category.state.error(error.message),
      )
  }

  resolveCategories(value: ProductCategory[], state: ViewStateState, message: string | undefined) {
    let asyncModels = toAsyncModels(value);
    this.categories = new AsyncModel(state, asyncModels, message)
    this.tree = this.productCategoryService.buildTree(value);
    this.categoriesToShow = this.pagination.getPage(asyncModels);
  }


}
