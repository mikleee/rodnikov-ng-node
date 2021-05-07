import {Component} from '@angular/core';
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {ProductsService} from "../products.service";
import {ProductsBaseComponent} from "../products-base.component";
import {ProductCategoryService} from "../../product-categories/product-category.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ProductsBaseComponent {
  supplier?: string;
  category?: string;

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected categoryService: ProductCategoryService) {
    super(productsService, suppliersService, categoryService);
  }

  applyFilter() {
    this.productsFilter.categories = [];
    this.productsFilter.suppliers = [];
    if (this.category) {
      this.productsFilter.categories.push(this.category);
    }
    if (this.supplier) {
      this.productsFilter.suppliers.push(this.supplier);
    }
    this.loadProducts();
  }


}
