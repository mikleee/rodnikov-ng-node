import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./modules/catalogue/catalogue.component";
import {ProductSupplierListComponent} from "./modules/catalogue/product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductSupplierComponent} from "./modules/catalogue/product-suppliers/product-supplier/product-supplier.component";
import {ProductComponent} from "./modules/catalogue/product/product/product.component";
import {ProductListComponent} from "./modules/catalogue/product/product-list/product-list.component";
import {ConfigurationComponent} from "./modules/configuration/configuration.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {ShowcaseComponent} from "./modules/showcase/showcase.component";
import {ProductCategoriesListComponent} from "./modules/catalogue/product-categories/product-categories-list/product-categories-list.component";
import {ProductCategoryComponent} from "./modules/catalogue/product-categories/product-category/product-category.component";


const routes: Routes = [

  // {path: '**', pathMatch: 'full', component: NotFoundComponent},
  {path: '', pathMatch: 'full', component: ShowcaseComponent},


  {path: 'login', pathMatch: 'full', component: LoginComponent},

  {
    path: 'catalogue', component: CatalogueComponent, children: [
      {path: 'suppliers', component: ProductSupplierListComponent},
      {path: 'suppliers/supplier', component: ProductSupplierComponent},
      {path: 'suppliers/supplier/:id', component: ProductSupplierComponent},
      {path: 'categories', component: ProductCategoriesListComponent},
      {path: 'categories/category', component: ProductCategoryComponent},
      {path: 'categories/category/:id', component: ProductCategoryComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'products/product', component: ProductComponent},
      {path: 'products/product/:id', component: ProductComponent},
      // {path: '', pathMatch: 'full', component: ProductSupplierListComponent},
      // {path: '**', pathMatch: 'full', component: Screen404Component},
    ]
  },
  {
    path: 'configuration', component: ConfigurationComponent, children: [

      // {path: '', pathMatch: 'full', component: Screen404Component},
      // {path: '**', pathMatch: 'full', component: Screen404Component},
    ]
  },

  // {path: '**', pathMatch: 'full', component: Screen404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
