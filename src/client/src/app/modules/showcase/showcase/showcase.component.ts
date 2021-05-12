import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../catalogue/product/products.service";
import {ProductSuppliersService} from "../../catalogue/product-suppliers/product-suppliers.service";
import {ProductCategoryService} from "../../catalogue/product-categories/product-category.service";
import {forkJoin} from "rxjs";
import {Product, ProductCategory, ProductSupplier} from "../../catalogue/catalogue.models";
import {first} from "rxjs/operators";
import {ViewState} from "../../shared/model/view-state.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ShowcaseFilters} from "../showcase-filters/showcase-filters.component";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  state: ViewState = new ViewState();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];

  productsState: ViewState = new ViewState();
  products: Product[] = [];
  filteredProducts: Product[] = [];


  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected categoryService: ProductCategoryService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadPage();
    this.loadProducts();
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
              this.filteredProducts = value;
              this.productsState.ready();
            },
            error => this.productsState.error(error)
          )
      });
  }

  onFiltersChange(filters: ShowcaseFilters) {
    debugger;
    this.filteredProducts = this.products;
    if (filters.suppliers?.length) {
      this.filteredProducts = this.filteredProducts.filter(p => filters.suppliers.includes(p.supplier));
    }
    if (filters.priceMin !== undefined) {
      let value = filters.priceMin;
      this.filteredProducts = this.filteredProducts.filter(p => p.priceUah >= value);
    }
    if (filters.priceMax !== undefined) {
      let value = filters.priceMax;
      this.filteredProducts = this.filteredProducts.filter(p => p.priceUah <= value);
    }
  }

}
