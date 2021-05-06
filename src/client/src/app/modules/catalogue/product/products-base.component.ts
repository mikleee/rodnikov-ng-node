import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product, ProductGroup, ProductsFilter, ProductSupplier} from "../catalogue.models";
import {mapToViewStates, ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {ProductsService} from "./products.service";
import {ProductSuppliersService} from "../product-suppliers/product-suppliers.service";
import {ProductGroupService} from "../product-groups/product-group.service";


@Injectable()
export class ProductsBaseComponent implements OnInit, OnDestroy {
  productsFilter: ProductsFilter = new ProductsFilter();

  productsState: ViewState = new ViewState();
  products: Product[] = [];

  suppliers$?: Subscription;
  suppliersState: ViewState = new ViewState();
  suppliers: { [key: string]: ProductSupplier } = {};

  groups$?: Subscription;
  groupsState: ViewState = new ViewState();
  groups: { [key: string]: ProductGroup } = {};

  individualProductsState: { [key: string]: ViewState } = {};

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected groupsService: ProductGroupService) {

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
    this.groups$?.unsubscribe();
  }

  loadProducts() {
    this.productsState.inProgress();
    this.productsService.getProducts(this.productsFilter)
      .subscribe(
        result => this.resolveProducts(result, ViewStateState.READY, undefined),
        error => this.resolveProducts([], ViewStateState.ERROR, error)
      );
  }

  resolveProducts(value: Product[], state: ViewStateState, message: string | undefined) {
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
        error => this.resolveSuppliers([], ViewStateState.ERROR, error),
      );
  }

  resolveSuppliers(value: ProductSupplier[], state: ViewStateState, message: string | undefined) {
    this.suppliersState.setState(state);
    this.suppliersState.setMessage(message);
    this.suppliers = value.reduce((ac, v) => {
      ac[v.id] = v;
      return ac;
    }, {} as { [key: string]: ProductSupplier });
  }


  loadGroups() {
    this.groupsState.inProgress();
    this.groups$ = this.groupsService.getProductGroups()
      .subscribe(
        result => this.resolveGroups(result, ViewStateState.READY, undefined),
        error => this.resolveGroups([], ViewStateState.READY, error),
      );
  }

  resolveGroups(value: ProductGroup[], state: ViewStateState, message: string | undefined) {
    this.groupsState.setState(state);
    this.groupsState.setMessage(message);
    this.groups = value.reduce((ac, v) => {
      ac[v.id] = v;
      return ac;
    }, {} as { [key: string]: ProductGroup });
  }


}
