import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {Product, ProductsFilter} from "../../../catalogue/catalogue.models";
import {ProductsService} from "../../../catalogue/product/products.service";
import {Pagination} from "../../../shared/model/pagination.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-showcase-products',
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() state: ViewState = new ViewState();

  pagination: Pagination;
  productsToShow: Product[] = [];


  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute) {
    this.pagination = new Pagination();
    this.pagination.pageSizeOptions = [3 * 3, 5 * 3, 10 * 3];
    this.pagination.pageSize = this.pagination.pageSizeOptions[0];
  }

  ngOnInit(): void {

  }

  onPagination($event: any) {
    this.paginate(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginate(changes.products.currentValue);
  }

  paginate(products: Product[]) {
    this.productsToShow = this.pagination.getPage(products);
  }

}
