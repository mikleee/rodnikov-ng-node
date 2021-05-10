import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../catalogue/product/products.service";
import {ProductSuppliersService} from "../../catalogue/product-suppliers/product-suppliers.service";
import {ProductCategoryService} from "../../catalogue/product-categories/product-category.service";
import {forkJoin} from "rxjs";
import {Product, ProductCategory, ProductsFilter, ProductSupplier} from "../../catalogue/catalogue.models";
import {first} from "rxjs/operators";
import {ViewState} from "../../shared/model/view-state.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  state: ViewState = new ViewState();

  filter: ProductsFilter = new ProductsFilter();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];

  productsState: ViewState = new ViewState();
  products: Product[] = [];


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
              this.productsState.ready();
            },
            error => this.productsState.error(error)
          )
      });
  }

}
