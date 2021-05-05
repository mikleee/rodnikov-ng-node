import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InProgressComponent} from "./component/in-progress/in-progress.component";
import {ErrorComponent} from "./component/error/error.component";
import {ImageUploadComponent} from './component/image-upload/image-upload.component';
import {FileUploadComponent} from './component/file-upload/file-upload.component';
import {ServerImageComponent} from './component/server-image/server-image.component';
import {Screen404Component} from './component/screen404/screen404.component';


@NgModule({
  declarations: [
    InProgressComponent,
    ErrorComponent,
    ImageUploadComponent,
    FileUploadComponent,
    ServerImageComponent,
    Screen404Component
  ],
  exports: [
    InProgressComponent,
    ErrorComponent,
    ImageUploadComponent,
    ServerImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
