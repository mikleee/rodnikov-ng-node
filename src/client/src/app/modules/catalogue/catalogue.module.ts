import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogueComponent} from "./catalogue.component";
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductSupplierComponent} from "./product-suppliers/product-supplier/product-supplier.component";
import {ProductSupplierListComponent} from "./product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductComponent} from './product/product/product.component';
import {ProductCategoriesTreeComponent} from "./product-categories/product-categories-tree/product-categories-tree.component";
import {ProductCategoryComponent} from "./product-categories/product-category/product-category.component";
import {ProductCategoriesDropdownComponent} from "./product-categories/product-categories-dropdown/product-categories-dropdown.component";
import {ProductCategoriesListComponent} from "./product-categories/product-categories-list/product-categories-list.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductSupplierComponent,
    ProductSupplierListComponent,
    ProductCategoriesListComponent,
    ProductCategoryComponent,
    ProductListComponent,
    ProductComponent,
    ProductCategoriesDropdownComponent,
    ProductCategoriesTreeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CatalogueModule {

}
