import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {ConfigurationInputComponent} from "./configuration-input/configuration-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigurationListComponent} from "./configuration-list/configuration-list.component";


@NgModule({
  declarations: [
    ConfigurationListComponent,
    ConfigurationInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule {
}
