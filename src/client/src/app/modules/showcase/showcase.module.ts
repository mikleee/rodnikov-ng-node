import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from "./showcase/showcase.component";
import {ShowcasePriceFiltersComponent} from './showcase-filters/showcase-price-filters/showcase-price-filters.component';
import {ShowcaseSortComponent} from './shared/showcase-sort/showcase-sort.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowcaseSupplierFiltersComponent} from "./showcase-filters/showcase-supplier-filters/showcase-supplier-filters.component";
import {ShowcaseProductsComponent} from './shared/showcase-products/showcase-products.component';
import {SharedModule} from "../shared/shared.module";
import {ShowcaseProductCardComponent} from './shared/showcase-product-card/showcase-product-card.component';
import {ShowcaseFiltersComponent} from './showcase-filters/showcase-filters.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ShowcaseDashboardComponent} from './showcase-dashboard/showcase-dashboard.component';
import {RouterModule} from "@angular/router";
import {ShowcaseSearchResultsComponent} from './showcase-search/showcase-search-results/showcase-search-results.component';
import {ShowcaseSearchBoxComponent} from './showcase-search/showcase-search-box/showcase-search-box.component';
import {ShowcaseProductComponent} from './showcase-product/showcase-product.component';
import {ShowcaseProductCategoriesForProductsComponent} from "./shared/showcase-product-categories-for-products/showcase-product-categories-for-products.component";
import {ShowcaseProductCategoriesComponent} from "./shared/showcase-product-categories/showcase-product-categories.component";
import {ShowcaseProductCategoriesLayoutComponent} from './shared/showcase-product-categories-layout/showcase-product-categories-layout.component';
import {ShowcaseAttributeFiltersComponent} from './showcase-filters/showcase-attribute-filters/showcase-attribute-filters.component';
import {ShowcaseProductGeneralComponent} from './showcase-product/showcase-product-general/showcase-product-general.component';
import {ShowcaseProductAttributesComponent} from './showcase-product/showcase-product-attributes/showcase-product-attributes.component';


@NgModule({
  declarations: [
    ShowcaseComponent,
    ShowcaseSupplierFiltersComponent,
    ShowcasePriceFiltersComponent,
    ShowcaseSortComponent,
    ShowcaseProductsComponent,
    ShowcaseProductCardComponent,
    ShowcaseFiltersComponent,
    ShowcaseDashboardComponent,
    ShowcaseProductCategoriesComponent,
    ShowcaseSearchResultsComponent,
    ShowcaseSearchBoxComponent,
    ShowcaseProductComponent,
    ShowcaseProductCategoriesForProductsComponent,
    ShowcaseProductCategoriesLayoutComponent,
    ShowcaseAttributeFiltersComponent,
    ShowcaseAttributeFiltersComponent,
    ShowcaseProductGeneralComponent,
    ShowcaseProductAttributesComponent,
  ],
  exports: [
    ShowcaseSearchBoxComponent,
    ShowcaseProductCategoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class ShowcaseModule {
}
