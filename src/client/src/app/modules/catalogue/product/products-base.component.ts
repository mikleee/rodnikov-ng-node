import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AsyncModel} from "../../shared/model/async.model";
import {Product, ProductGroup, ProductSupplier} from "../catalogue.models";
import {ViewStateState} from "../../shared/model/view-state.model";
import {ProductsService} from "./products.service";
import {ProductSuppliersService} from "../product-suppliers/product-suppliers.service";
import {ProductGroupService} from "../product-groups/product-group.service";


@Injectable()
export class ProductsBaseComponent implements OnInit, OnDestroy {
  products$?: Subscription;
  products: AsyncModel<AsyncModel<Product>[]> = new AsyncModel<AsyncModel<Product>[]>(ViewStateState.UNTOUCHED, []);

  suppliers$?: Subscription;
  suppliers: AsyncModel<Map<String, ProductSupplier>> = new AsyncModel<Map<String, ProductSupplier>>(ViewStateState.UNTOUCHED, new Map<String, ProductSupplier>());

  groups$?: Subscription;
  groups: AsyncModel<Map<String, ProductGroup>> = new AsyncModel<Map<String, ProductGroup>>(ViewStateState.UNTOUCHED, new Map<String, ProductGroup>());


  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected groupsService: ProductGroupService) {

  }


  deleteProduct(product: AsyncModel<ProductSupplier>) {
    product.state.inProgress();
    this.productsService.deleteProduct(product.value.id)
      .then(
        (result) => product.state.ready(),
        (error) => product.state.error(error.message),
      )
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSuppliers();
    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.products$?.unsubscribe();
    this.suppliers$?.unsubscribe();
    this.groups$?.unsubscribe();
  }

  loadProducts() {
    this.products.state.inProgress();
    this.products$ = this.productsService.loadProducts()
      .subscribe(
        result => {
          this.products.state.ready();
          this.products.value = result.map((v) => new AsyncModel<Product>(ViewStateState.UNTOUCHED, v));
        },
        error => this.products = new AsyncModel<AsyncModel<Product>[]>(ViewStateState.ERROR, [], error)
      );
  }

  loadSuppliers() {
    this.suppliers.state.inProgress();
    this.suppliers$ = this.suppliersService.loadSuppliers()
      .subscribe(
        result => {
          this.suppliers.state.ready();
          this.suppliers.value.clear();
          result.map((v) => this.suppliers.value.set(v.id, v));
        },
        error => this.suppliers = new AsyncModel<Map<String, ProductSupplier>>(ViewStateState.ERROR, new Map<String, ProductSupplier>(), error)
      );
  }

  loadGroups() {
    this.groups.state.inProgress();
    this.groups$ = this.groupsService.loadProductGroups()
      .subscribe(
        result => {
          this.groups.state.ready();
          this.groups.value.clear();
          result.map((v) => this.groups.value.set(v.id, v));
        },
        error => this.groups = new AsyncModel<Map<String, ProductGroup>>(ViewStateState.ERROR, new Map<String, ProductGroup>(), error)
      );
  }

}
