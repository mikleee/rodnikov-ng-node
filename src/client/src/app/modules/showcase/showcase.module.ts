import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from "./showcase/showcase.component";
import {ShowcasePriceFiltersComponent} from './showcase-filters/showcase-price-filters/showcase-price-filters.component';
import {ShowcaseSortComponent} from './showcase-sort/showcase-sort.component';
import {ShowcaseSearchComponent} from './showcase-search1/showcase-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowcaseSupplierFiltersComponent} from "./showcase-filters/showcase-supplier-filters/showcase-supplier-filters.component";
import {ShowcaseProductsComponent} from './shared/showcase-products/showcase-products.component';
import {SharedModule} from "../shared/shared.module";
import {ShowcaseProductCardComponent} from './shared/showcase-product-card/showcase-product-card.component';
import {ShowcaseFiltersComponent} from './showcase-filters/showcase-filters.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ShowcaseDashboardComponent} from './showcase-dashboard/showcase-dashboard.component';
import {ShowcaseCategoriesComponent} from './showcase-categories/showcase-categories.component';
import {ShowcaseCategoriesSubcategoriesComponent} from './showcase-categories/showcase-categories-subcategories/showcase-categories-subcategories.component';
import {RouterModule} from "@angular/router";
import {ShowcaseCategoriesCategoryLinkComponent} from './showcase-categories/showcase-categories-category-link/showcase-categories-category-link.component';
import { ShowcaseProductCategoriesComponent } from './showcase-product-categories/showcase-product-categories.component';
import { ShowcaseSearchResultsComponent } from './showcase-search/showcase-search-results/showcase-search-results.component';
import { ShowcaseSearchBoxComponent } from './showcase-search/showcase-search-box/showcase-search-box.component';
import { ShowcaseSearchTriggerComponent } from './showcase-search/showcase-search-trigger/showcase-search-trigger.component';


@NgModule({
  declarations: [
    ShowcaseComponent,
    ShowcaseSupplierFiltersComponent,
    ShowcasePriceFiltersComponent,
    ShowcaseSortComponent,
    ShowcaseSearchComponent,
    ShowcaseProductsComponent,
    ShowcaseProductCardComponent,
    ShowcaseFiltersComponent,
    ShowcaseDashboardComponent,
    ShowcaseCategoriesComponent,
    ShowcaseCategoriesSubcategoriesComponent,
    ShowcaseCategoriesCategoryLinkComponent,
    ShowcaseProductCategoriesComponent,
    ShowcaseSearchResultsComponent,
    ShowcaseSearchBoxComponent,
    ShowcaseSearchTriggerComponent
  ],
  exports: [
    ShowcaseSearchBoxComponent,
    ShowcaseCategoriesComponent
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
