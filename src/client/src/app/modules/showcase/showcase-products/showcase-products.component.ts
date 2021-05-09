import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {Product, ProductsFilter} from "../../catalogue/catalogue.models";
import {ProductsService} from "../../catalogue/product/products.service";
import {Pagination} from "../../shared/model/pagination.model";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-showcase-products',
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit {
  pagination: Pagination;

  filter: ProductsFilter = new ProductsFilter();
  productsState: ViewState = new ViewState();
  products: Product[] = [];
  productsToShow: Product[] = [];


  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute) {
    this.pagination = new Pagination();
    this.pagination.pageSizeOptions = [3 * 3, 5 * 3, 10 * 3];
    this.pagination.pageSize = this.pagination.pageSizeOptions[1];
  }

  ngOnInit(): void {
    this.initProducts();
  }

  onPagination($event: any) {
    this.paginate(this.products);
  }

  initProducts(): void {
    this.activatedRoute.queryParams
      .pipe(first())
      .subscribe(params => {
        this.filter = new ProductsFilter(
          params['f-keyword'],
          params['f-name'],
          params['f-category'],
          params['f-suppliers'],
          params['f-priceFrom'],
          params['f-priceTo'],
        );
        this.loadProducts(this.filter);
      });
  }

  loadProducts(filter: ProductsFilter): Subscription {
    this.productsState.inProgress();
    return this.productsService.getProducts(filter)
      .subscribe(
        result => this.resolveProducts(result, ViewStateState.READY, undefined),
        error => this.resolveProducts([], ViewStateState.ERROR, error)
      );
  }

  resolveProducts(value: Product[], state: ViewStateState, message: string | undefined) {
    this.productsState.setState(state);
    this.productsState.setMessage(message);
    this.products = value;
    this.paginate(value);
  }

  paginate(products: Product[]) {
    this.productsToShow = this.pagination.getPage(products);
  }

}
