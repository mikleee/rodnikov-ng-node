import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogueComponent} from "./catalogue.component";
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductGroupsListComponent} from './product-groups/product-groups-list/product-groups-list.component';
import {ProductSupplierComponent} from "./product-suppliers/product-supplier/product-supplier.component";
import {ProductSupplierListComponent} from "./product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductGroupComponent} from './product-groups/product-group/product-group.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductComponent} from './product/product/product.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductSupplierComponent,
    ProductSupplierListComponent,
    ProductGroupsListComponent,
    ProductGroupComponent,
    ProductListComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CatalogueModule {

}
