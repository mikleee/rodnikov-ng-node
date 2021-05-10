import {Component, OnInit} from '@angular/core';
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {ProductsService} from "../products.service";
import {ProductCategoryService} from "../../product-categories/product-category.service";
import {Pagination} from "../../../shared/model/pagination.model";
import {Product, ProductCategory, ProductsFilter, ProductSupplier} from "../../catalogue.models";
import {ViewState} from "../../../shared/model/view-state.model";
import {forkJoin} from "rxjs";
import {first} from "rxjs/operators";
import {toAsyncModels, toMap} from "../../../shared/utils";
import {AsyncModel} from "../../../shared/model/async.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  state: ViewState = new ViewState();

  suppliers: { [key: string]: ProductSupplier } = {};
  categories: { [key: string]: ProductCategory } = {};
  products: Product[] = [];

  filter = this.initFilter();
  filteredProducts: Product[] = [];

  pagination: Pagination = new Pagination();
  productsToShow: AsyncModel<Product>[] = []

  supplier?: string;
  category?: string;
  name?: string;

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected categoryService: ProductCategoryService) {
  }

  applyFilter() {
    this.filter = this.initFilter();
    this.initProducts(this.products);
  }

  clearFilter() {
    this.supplier = undefined;
    this.category = undefined;
    this.name = undefined;
    this.applyFilter();
  }

  initFilter() {
    return new ProductsFilter(
      this.name,
      this.category,
      this.supplier,
      undefined,
      undefined
    );
  }

  initProducts(value: Product[]) {
    this.filteredProducts = this.productsService.filterProducts(value, this.filter);
    this.pagination.total = this.filteredProducts.length;
    this.productsToShow = toAsyncModels(this.pagination.getPage(this.filteredProducts));
  }

  deleteProduct(product: AsyncModel<Product>) {
    product.state.inProgress();
    this.productsService.deleteProduct(product.value.id)
      .then(
        (result) => {
          this.products = this.products.filter(p => p.id != product.value.id);
          this.initProducts(this.products);
          product.state.ready()
        },
        (error) => product.state.error(error.message),
      )
  }

  ngOnInit(): void {
    this.state.inProgress();
    forkJoin([
      this.productsService.getProducts(),
      this.suppliersService.getSuppliers(),
      this.categoryService.getProductCategories()
    ])
      .pipe(first())
      .subscribe(
        (value) => {
          this.products = value[0];
          this.suppliers = toMap(value[1]);
          this.categories = toMap(value[2]);
          this.initProducts(this.products);
          this.state.ready();
        },
        error => this.state.error(error)
      )
  }

}
