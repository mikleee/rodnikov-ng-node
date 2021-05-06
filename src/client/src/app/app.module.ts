import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CatalogueModule} from "./modules/catalogue/catalogue.module";
import {HttpClientModule} from "@angular/common/http";
import {GoodsModule} from "./modules/goods/goods.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CatalogueModule,
    GoodsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
