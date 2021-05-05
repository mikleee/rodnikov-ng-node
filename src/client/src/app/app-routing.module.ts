import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./modules/catalogue/catalogue.component";
import {ProductSupplierListComponent} from "./modules/catalogue/product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductSupplierComponent} from "./modules/catalogue/product-suppliers/product-supplier/product-supplier.component";
import {ProductGroupsListComponent} from "./modules/catalogue/product-groups/product-groups-list/product-groups-list.component";
import {ProductGroupComponent} from "./modules/catalogue/product-groups/product-group/product-group.component";
import {ProductComponent} from "./modules/catalogue/product/product/product.component";
import {ProductListComponent} from "./modules/catalogue/product/product-list/product-list.component";
import {Screen404Component} from "./modules/shared/component/screen404/screen404.component";
import {ConfigurationComponent} from "./modules/configuration/configuration.component";


const routes: Routes = [

  // {path: '**', pathMatch: 'full', component: NotFoundComponent},
  // {path: '', pathMatch: 'full', component: AppComponent},
  {
    path: 'catalogue', component: CatalogueComponent, children: [
      {path: 'suppliers', component: ProductSupplierListComponent},
      {path: 'suppliers/supplier', component: ProductSupplierComponent},
      {path: 'suppliers/supplier/:id', component: ProductSupplierComponent},
      {path: 'groups', component: ProductGroupsListComponent},
      {path: 'groups/group', component: ProductGroupComponent},
      {path: 'groups/group/:id', component: ProductGroupComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'products/product', component: ProductComponent},
      {path: 'products/product/:id', component: ProductComponent},
      {path: '', pathMatch: 'full', component: ProductSupplierListComponent},
      {path: '**', pathMatch: 'full', component: Screen404Component},
    ]
  },
  {
    path: 'configuration', component: ConfigurationComponent, children: [

      {path: '', pathMatch: 'full', component: Screen404Component},
      {path: '**', pathMatch: 'full', component: Screen404Component},
    ]
  },

  {path: '**', pathMatch: 'full', component: Screen404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
