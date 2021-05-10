import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-product-card',
  templateUrl: './showcase-product-card.component.html',
  styleUrls: ['./showcase-product-card.component.scss']
})
export class ShowcaseProductCardComponent implements OnInit {
  @Input() product: Product = {} as Product

  constructor() {
  }

  ngOnInit(): void {
  }

}
