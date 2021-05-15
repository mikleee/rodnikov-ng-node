import {Component, OnInit} from '@angular/core';
import {ViewState} from "../../../shared/model/view-state.model";
import {ProductAttribute} from "../../../catalogue/catalogue.models";
import {ProductAttributeService} from "../../../catalogue/product/product-attributes/product-attribute.service";
import {first} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-showcase-product-attributes',
  templateUrl: './showcase-product-attributes.component.html',
  styleUrls: ['./showcase-product-attributes.component.scss']
})
export class ShowcaseProductAttributesComponent implements OnInit {
  state: ViewState = new ViewState();
  attributes: ProductAttribute[] = [];


  constructor(
    private route: ActivatedRoute,
    private productAttributeService: ProductAttributeService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.params['id'];
    this.state.inProgress();
    this.productAttributeService.getAttributesForProduct(id)
      .pipe(first())
      .subscribe(
        (value) => {
          this.attributes = value;
          this.state.ready();
        },
        error => this.state.error(error.message)
      )
  }


}
