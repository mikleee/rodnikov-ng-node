import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from "./showcase.component";
import {ShowcasePriceFiltersComponent} from './showcase-filters/showcase-price-filters/showcase-price-filters.component';
import {ShowcaseSortComponent} from './showcase-sort/showcase-sort.component';
import {ShowcaseSearchComponent} from './showcase-search/showcase-search.component';
import {FormsModule} from "@angular/forms";
import {ShowcaseSupplierFiltersComponent} from "./showcase-filters/showcase-supplier-filters/showcase-supplier-filters.component";
import {ShowcaseProductsComponent} from './showcase-products/showcase-products.component';
import {SharedModule} from "../shared/shared.module";
import {ShowcaseProductCardComponent} from './showcase-product-card/showcase-product-card.component';
import {ShowcaseFiltersComponent} from './showcase-filters/showcase-filters.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ShowcaseComponent,
    ShowcaseSupplierFiltersComponent,
    ShowcasePriceFiltersComponent,
    ShowcaseSortComponent,
    ShowcaseSearchComponent,
    ShowcaseProductsComponent,
    ShowcaseProductCardComponent,
    ShowcaseFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
  ]
})
export class ShowcaseModule {
}
