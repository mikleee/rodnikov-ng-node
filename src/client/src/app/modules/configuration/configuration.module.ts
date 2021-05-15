import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {ConfigurationInputComponent} from "./configuration-input/configuration-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigurationDashboardComponent} from "./configuration/configuration-dashboard.component";


@NgModule({
  declarations: [
    ConfigurationDashboardComponent,
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
