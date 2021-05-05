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


  constructor(protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected groupsService: ProductGroupService) {
    super(productsService, suppliersService, groupsService);
  }


}
