import {Component} from '@angular/core';
import {ShowcaseProductSubComponent} from "../showcase-product.sub.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-showcase-product-general',
  templateUrl: './showcase-product-general.component.html',
  styleUrls: ['./showcase-product-general.component.scss']
})
export class ShowcaseProductGeneralComponent extends ShowcaseProductSubComponent {
  images: string[] = [];
  activeImage?: string;
  hoverImage?: string;


  constructor(
    protected route: ActivatedRoute
  ) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.images = [];
    if (this.product.mainImage) {
      this.images.push(this.product.mainImage);
    }
    if (this.product.additionalImages?.length) {
      this.images = this.images.concat(this.product.additionalImages);
    }
    this.activeImage = this.images[0];
  }

}
