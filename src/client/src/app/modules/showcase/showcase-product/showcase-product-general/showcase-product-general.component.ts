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
    let main: string[] = [];
    let other: string[] = [];
    this.product.images.forEach(i => i.main ? main.push(i.id) : other.push(i.id))
    this.images = [...main, ...other];
    this.activeImage = this.images[0];
  }

}
