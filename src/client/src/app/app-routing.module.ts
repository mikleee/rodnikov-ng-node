import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./modules/catalogue/catalogue.component";
import {ProductSupplierListComponent} from "./modules/catalogue/product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductSupplierComponent} from "./modules/catalogue/product-suppliers/product-supplier/product-supplier.component";
import {ProductGroupsListComponent} from "./modules/catalogue/product-groups/product-groups-list/product-groups-list.component";
import {ProductGroupComponent} from "./modules/catalogue/product-groups/product-group/product-group.component";

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
