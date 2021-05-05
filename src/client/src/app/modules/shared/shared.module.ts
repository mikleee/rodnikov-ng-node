import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InProgressComponent} from "./component/in-progress/in-progress.component";
import {ErrorComponent} from "./component/error/error.component";
import {NotFoundComponent} from './component/not-found/not-found.component';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { ServerImageComponent } from './component/server-image/server-image.component';


@NgModule({
  declarations: [
    InProgressComponent,
    ErrorComponent,
    NotFoundComponent,
    ImageUploadComponent,
    FileUploadComponent,
    ServerImageComponent
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
