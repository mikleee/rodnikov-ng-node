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
import {PaginationComponent} from './pagination/pagination.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NotImplementedComponent} from './component/not-implemented/not-implemented.component';
import {GlobalToasterComponent} from './component/global-toaster/global-toaster.component';
import {StateOverlayComponent} from './component/state-overlay/state-overlay.component';
import {UpliftPipe} from './transform/uplift.pipe';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {InputNumberDirective} from './directive/input-number.directive';
import {ButtonAddDirective, ButtonCancelDirective, ButtonDeleteDirective, ButtonEditDirective, ButtonOkDirective, ButtonResetDirective, ButtonSaveDirective} from "./directive/button.directives";
import {FormErrorComponent} from './component/form-error/form-error.component';
import {ProductMainImagePipe} from './transform/product-main-image.pipe';


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
    NotImplementedComponent,
    GlobalToasterComponent,
    StateOverlayComponent,
    UpliftPipe,
    NotFoundComponent,
    InputNumberDirective,
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonDeleteDirective,
    ButtonEditDirective,
    ButtonOkDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    FormErrorComponent,
    ProductMainImagePipe,
  ],
  exports: [
    InProgressComponent,
    ErrorComponent,
    ImageUploadComponent,
    ServerImageComponent,
    CurrencyUsdPipe,
    CurrencyUahPipe,
    PaginationComponent,
    NotImplementedComponent,
    GlobalToasterComponent,
    StateOverlayComponent,
    UpliftPipe,
    NotFoundComponent,
    InputNumberDirective,
    ButtonAddDirective,
    ButtonCancelDirective,
    ButtonDeleteDirective,
    ButtonEditDirective,
    ButtonOkDirective,
    ButtonResetDirective,
    ButtonSaveDirective,
    FormErrorComponent,
    ProductMainImagePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule {
}



