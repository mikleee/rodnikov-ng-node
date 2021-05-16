import {Injectable, OnInit} from '@angular/core';
import {Product} from "../../catalogue/catalogue.models";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";

@Injectable()
export class ShowcaseProductSubComponent implements OnInit {
  product: Product = {} as Product;


  constructor(
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.parent?.data
      .pipe(first())
      .subscribe(value => this.product = value as Product);
  }

}
