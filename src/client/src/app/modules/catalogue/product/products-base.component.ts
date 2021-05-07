import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product, ProductCategory, ProductsFilter, ProductSupplier} from "../catalogue.models";
import {mapToViewStates, ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {ProductsService} from "./products.service";
import {ProductSuppliersService} from "../product-suppliers/product-suppliers.service";
import {ProductCategoryService} from "../product-categories/product-category.service";


@Injectable()
export class ProductsBaseComponent implements OnInit, OnDestroy {
  productsFilter: ProductsFilter = new ProductsFilter();

  productsState: ViewState = new ViewState();
  products: Product[] = [];

  suppliers$?: Subscription;
  suppliersState: ViewState = new ViewState();
  suppliers: { [key: string]: ProductSupplier } = {};

  categories$?: Subscription;
  categoriesState: ViewState = new ViewState();
  categories: { [key: string]: ProductCategory } = {};

  individualProductsState: { [key: string]: ViewState } = {};

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected categoryService: ProductCategoryService) {

  }


  deleteProduct(product: ProductSupplier) {
    let state = this.individualProductsState[product.id];
    state?.inProgress();
    this.productsService.deleteProduct(product.id)
      .then(
        (result) => state?.ready(),
        (error) => state?.error(error.message),
      )
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSuppliers();
    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.suppliers$?.unsubscribe();
    this.categories$?.unsubscribe();
  }

  loadProducts() {
    this.productsState.inProgress();
    this.productsService.getProducts(this.productsFilter)
      .subscribe(
        result => this.resolveProducts(result, ViewStateState.READY, undefined),
        error => this.resolveProducts([], ViewStateState.ERROR, error)
      );
  }

  protected resolveProducts(value: Product[], state: ViewStateState, message: string | undefined) {
    this.productsState.setState(state);
    this.productsState.setMessage(message);
    this.products = value;
    this.individualProductsState = mapToViewStates(value);
  }

  loadSuppliers() {
    this.suppliersState.inProgress();
    this.suppliers$ = this.suppliersService.getSuppliers()
      .subscribe(
        result => this.resolveSuppliers(result, ViewStateState.READY, undefined),
        error => this.resolveSuppliers({}, ViewStateState.ERROR, error),
      );
  }

  resolveSuppliers(value: { [key: string]: ProductSupplier }, state: ViewStateState, message: string | undefined) {
    this.suppliersState.setState(state);
    this.suppliersState.setMessage(message);
    this.suppliers = value;
  }


  loadGroups() {
    this.categoriesState.inProgress();
    this.categories$ = this.categoryService.getProductCategories()
      .subscribe(
        result => this.resolveCategories(result, ViewStateState.READY, undefined),
        error => this.resolveCategories({}, ViewStateState.READY, error),
      );
  }

  resolveCategories(value: { [key: string]: ProductCategory }, state: ViewStateState, message: string | undefined) {
    this.categoriesState.setState(state);
    this.categoriesState.setMessage(message);
    this.categories = value;
  }


}
