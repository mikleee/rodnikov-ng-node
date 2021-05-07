import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {Product, ProductsFilter} from "../../catalogue/catalogue.models";
import {ProductsService} from "../../catalogue/product/products.service";
import {Pagination} from "../../shared/model/pagination.model";

@Component({
  selector: 'app-showcase-products',
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit {
  pagination: Pagination;

  productsFilter: ProductsFilter = new ProductsFilter();
  productsState: ViewState = new ViewState();
  products: Product[] = [];
  productsToShow: Product[] = [];


  constructor(private productsService: ProductsService) {
    this.pagination = new Pagination();
    this.pagination.pageSizeOptions = [3 * 3, 5 * 3, 10 * 3];
    this.pagination.pageSize = this.pagination.pageSizeOptions[1];
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onPagination($event: any) {
    this.paginate(this.products);
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
    this.paginate(value);
  }

  paginate(products: Product[]) {
    this.productsToShow = this.pagination.getPage(products);
  }

}
