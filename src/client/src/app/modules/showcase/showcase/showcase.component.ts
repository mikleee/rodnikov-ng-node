import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../catalogue/product/products.service";
import {ProductSuppliersService} from "../../catalogue/product-suppliers/product-suppliers.service";
import {ProductCategoryService} from "../../catalogue/product-categories/product-category.service";
import {forkJoin, Subscription} from "rxjs";
import {Product, ProductCategory, ProductSupplier} from "../../catalogue/catalogue.models";
import {first} from "rxjs/operators";
import {ViewState} from "../../shared/model/view-state.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ShowcaseFiltersService} from "../showcase-filters/showcase-filters.service";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  state: ViewState = new ViewState();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];

  productsState: ViewState = new ViewState();
  products: Product[] = [];
  filteredProducts: Product[] = [];

  filterChange$?: Subscription;


  constructor(private productsService: ProductsService,
              private suppliersService: ProductSuppliersService,
              private categoryService: ProductCategoryService,
              private showcaseFiltersService: ShowcaseFiltersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadPage();
    this.loadProducts();
    this.subscribeOnFiltersChange();
  }

  loadPage() {
    this.state.inProgress();
    forkJoin([
      this.suppliersService.getSuppliers(),
      this.categoryService.getProductCategories()
    ])
      .pipe(first())
      .subscribe(
        (value) => {
          this.suppliers = value[0];
          this.categories = value[1];
          this.state.ready();
        },
        error => this.state.error(error)
      );
  }

  loadProducts() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.productsState.inProgress();
        let keyword = params['keyword'];
        let category = params['f-category'];
        let suppliers = params['f-suppliers'];
        this.productsService.getProductsByCriteria(keyword, category, suppliers)
          .subscribe(
            (value) => {
              this.products = value;
              this.filteredProducts = this.showcaseFiltersService.applyOnProducts(this.products, this.showcaseFiltersService.filters$.getValue());
              this.productsState.ready();

            },
            error => this.productsState.error(error)
          )
      });
  }

  subscribeOnFiltersChange() {
    this.showcaseFiltersService.resetFilters();
    this.filterChange$ = this.showcaseFiltersService.filters$.subscribe(filters => {
      this.filteredProducts = this.showcaseFiltersService.applyOnProducts(this.products, filters);
    })
  }

  ngOnDestroy(): void {
    this.filterChange$?.unsubscribe();
  }


}
