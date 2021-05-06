import {Component} from '@angular/core';
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {ProductsService} from "../products.service";
import {ProductGroupService} from "../../product-groups/product-group.service";
import {ProductsBaseComponent} from "../products-base.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ProductsBaseComponent {
  supplier?: string;
  group?: string;

  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected groupsService: ProductGroupService) {
    super(productsService, suppliersService, groupsService);
  }

  applyFilter() {
    this.productsFilter.groups = [];
    this.productsFilter.suppliers = [];
    if (this.group) {
      this.productsFilter.groups.push(this.group);
    }
    if (this.supplier) {
      this.productsFilter.suppliers.push(this.supplier);
    }
    this.loadProducts();
  }


}
