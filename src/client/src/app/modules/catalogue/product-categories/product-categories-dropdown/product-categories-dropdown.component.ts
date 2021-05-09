import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductCategory} from "../../catalogue.models";
import {ProductCategoryService} from "../product-category.service";


@Component({
  selector: 'app-product-categories-dropdown',
  templateUrl: './product-categories-dropdown.component.html',
  styleUrls: ['./product-categories-dropdown.component.scss']
})
export class ProductCategoriesDropdownComponent implements OnInit {
  @Input() nullOption?: string;
  @Input() selectId: string = Math.random().toString();
  @Input() category?: string;
  @Output() categoryChange = new EventEmitter<ProductCategory>();

  categories$?: Subscription;
  categoriesState = new ViewState();
  categories: { [key: string]: ProductCategory } = {};

  constructor(protected productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.categoriesState.inProgress();
    this.categories$ = this.productCategoryService.getProductCategories()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups({}, ViewStateState.ERROR, error)
      );
  }

  onChange() {
    const category = this.category ? this.categories[this.category] : undefined;
    this.categoryChange.emit(category);
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe();
  }

  resolveGroups(value: { [key: string]: ProductCategory }, state: ViewStateState, message: string | undefined) {
    this.categoriesState.setState(state);
    this.categoriesState.setMessage(message);
    this.categories = value;
  }

}
