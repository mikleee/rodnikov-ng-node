import {Component} from '@angular/core';
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {ProductsService} from "../products.service";
import {ProductsBaseComponent} from "../products-base.component";
import {ProductCategoryService} from "../../product-categories/product-category.service";
import {Pagination} from "../../../shared/model/pagination.model";
import {Product, ProductsFilter} from "../../catalogue.models";
import {ViewStateState} from "../../../shared/model/view-state.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ProductsBaseComponent {
  filter = this.initFilter();
  filteredProducts: Product[] = [];

  supplier?: string;
  category?: string;
  name?: string;

  pagination: Pagination = new Pagination();
  productsToShow: Product[] = []

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected categoryService: ProductCategoryService) {
    super(productsService, suppliersService, categoryService);
  }

  applyFilter() {
    debugger
    this.filter = this.initFilter();
    this.initProducts(this.products);
  }

  initFilter() {
    return new ProductsFilter(
      undefined,
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
    this.productsToShow = this.pagination.getPage(this.filteredProducts);
  }

  protected resolveProducts(value: Product[], state: ViewStateState, message: string | undefined) {
    super.resolveProducts(value, state, message);
    this.initProducts(value);
  }


}
