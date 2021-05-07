import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InProgressComponent} from "./component/in-progress/in-progress.component";
import {ErrorComponent} from "./component/error/error.component";
import {ImageUploadComponent} from './component/image-upload/image-upload.component';
import {FileUploadComponent} from './component/file-upload/file-upload.component';
import {ServerImageComponent} from './component/server-image/server-image.component';
import {Screen404Component} from './component/screen404/screen404.component';
import {CurrencyPipe} from "./transform/currency.pipe";
import {CurrencyUsdPipe} from "./transform/currency-usd.pipe";
import {CurrencyUahPipe} from "./transform/currency-uah.pipe";
import {AsyncDropdownComponent} from './component/async-dropdown/async-dropdown.component';
import {FormsModule} from "@angular/forms";
import { PaginationComponent } from './pagination/pagination.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    InProgressComponent,
    ErrorComponent,
    ImageUploadComponent,
    FileUploadComponent,
    ServerImageComponent,
    Screen404Component,
    CurrencyPipe,
    CurrencyUsdPipe,
    CurrencyUahPipe,
    AsyncDropdownComponent,
    PaginationComponent,
  ],
  exports: [
    InProgressComponent,
    ErrorComponent,
    ImageUploadComponent,
    ServerImageComponent,
    CurrencyUsdPipe,
    CurrencyUahPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule {
}
