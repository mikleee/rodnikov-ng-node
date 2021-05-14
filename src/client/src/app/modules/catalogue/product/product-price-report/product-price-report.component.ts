import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../catalogue.models";

@Component({
  selector: 'app-product-price-report',
  templateUrl: './product-price-report.component.html',
  styleUrls: ['./product-price-report.component.scss']
})
export class ProductPriceReportComponent implements OnInit {
  @Input() product: Product = {} as Product;

  constructor() {
  }

  ngOnInit(): void {
  }

}
