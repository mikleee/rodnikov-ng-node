import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./modules/catalogue/catalogue.component";
import {ProductSupplierListComponent} from "./modules/catalogue/product-suppliers/product-supplier-list/product-supplier-list.component";
import {ProductSupplierComponent} from "./modules/catalogue/product-suppliers/product-supplier/product-supplier.component";
import {ProductComponent} from "./modules/catalogue/product/product/product.component";
import {ProductListComponent} from "./modules/catalogue/product/product-list/product-list.component";
import {ConfigurationComponent} from "./modules/configuration/configuration.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {ShowcaseComponent} from "./modules/showcase/showcase/showcase.component";
import {ProductCategoriesListComponent} from "./modules/catalogue/product-categories/product-categories-list/product-categories-list.component";
import {ProductCategoryComponent} from "./modules/catalogue/product-categories/product-category/product-category.component";
import {ShowcaseDashboardComponent} from "./modules/showcase/showcase-dashboard/showcase-dashboard.component";
import {ContactsComponent} from "./modules/simple-pages/contacts/contacts.component";
import {PaymentAndDeliveryComponent} from "./modules/simple-pages/payment-and-delivery/payment-and-delivery.component";
import {AboutUsComponent} from "./modules/simple-pages/about-us/about-us.component";
import {ShowcaseProductComponent} from "./modules/showcase/shared/showcase-product/showcase-product.component";
import {ShowcaseSearchResultsComponent} from "./modules/showcase/showcase-search/showcase-search-results/showcase-search-results.component";
import {ProductAttributeTemplatesListComponent} from "./modules/catalogue/product-attribute-templates/product-attribute-templates-list/product-attribute-templates-list.component";
import {ProductAttributeTemplateComponent} from "./modules/catalogue/product-attribute-templates/product-attribute-template/product-attribute-template.component";


const routes: Routes = [

  // {path: '**', pathMatch: 'full', component: NotFoundComponent},
  {path: '', pathMatch: 'full', component: ShowcaseDashboardComponent},
  {path: 'products', component: ShowcaseComponent},
  {path: 'product/:id', component: ShowcaseProductComponent},
  {path: 'search', component: ShowcaseSearchResultsComponent},
  {path: 'contacts', pathMatch: 'full', component: ContactsComponent},
  {path: 'payment-and-delivery', pathMatch: 'full', component: PaymentAndDeliveryComponent},
  {path: 'about-us', pathMatch: 'full', component: AboutUsComponent},


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
      {path: 'attribute-template', component: ProductAttributeTemplatesListComponent},
      {path: 'attribute-template/template', component: ProductAttributeTemplateComponent},
      {path: 'attribute-template/template/:id', component: ProductAttributeTemplateComponent},
      // {path: '', pathMatch: 'full', component: ProductSupplierListComponent},
      {path: '**', pathMatch: 'full', component: ProductListComponent},
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
