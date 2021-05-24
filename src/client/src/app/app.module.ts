import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CatalogueModule} from "./modules/catalogue/catalogue.module";
import {HttpClientModule} from "@angular/common/http";
import {ShowcaseModule} from "./modules/showcase/showcase.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./modules/shared/shared.module";
import {ConfigurationModule} from "./modules/configuration/configuration.module";
import {AuthModule} from "./modules/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CatalogueModule,
    ShowcaseModule,
    ConfigurationModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    AuthModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
