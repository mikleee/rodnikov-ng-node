import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ViewState} from "../../../shared/model/view-state.model";
import {Product, ProductCategory} from "../../../catalogue/catalogue.models";
import {Pagination} from "../../../shared/model/pagination.model";

@Component({
  selector: 'app-showcase-products',
  templateUrl: './showcase-products.component.html',
  styleUrls: ['./showcase-products.component.scss']
})
export class ShowcaseProductsComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() categories: ProductCategory[] = [];
  @Input() state: ViewState = new ViewState();

  pagination: Pagination;
  productsToShow: Product[] = [];


  constructor() {
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
    if (changes.products) {
      this.paginate(changes.products.currentValue);
    }
  }

  paginate(products: Product[] = []) {
    this.productsToShow = this.pagination.getPage(products);
  }

}
