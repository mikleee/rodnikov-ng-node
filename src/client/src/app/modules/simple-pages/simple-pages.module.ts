import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentAndDeliveryComponent} from './payment-and-delivery/payment-and-delivery.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactsComponent} from './contacts/contacts.component';


@NgModule({
  declarations: [
    PaymentAndDeliveryComponent,
    AboutUsComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SimplePagesModule {
}
