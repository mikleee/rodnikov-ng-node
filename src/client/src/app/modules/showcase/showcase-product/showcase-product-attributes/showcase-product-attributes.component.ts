import {Component} from '@angular/core';
import {ShowcaseProductSubComponent} from "../showcase-product.sub.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-showcase-product-attributes',
  templateUrl: './showcase-product-attributes.component.html',
  styleUrls: ['./showcase-product-attributes.component.scss']
})
export class ShowcaseProductAttributesComponent extends ShowcaseProductSubComponent {

  constructor(
    protected route: ActivatedRoute
  ) {
    super(route);
  }

}
