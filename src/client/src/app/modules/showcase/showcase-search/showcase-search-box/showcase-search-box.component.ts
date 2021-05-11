import {Component} from '@angular/core';
import {ShowcaseSearchBaseComponent} from "../showcase-search-base-component";
import {Router} from "@angular/router";
import {ProductsService} from "../../../catalogue/product/products.service";

@Component({
  selector: 'app-showcase-search-box',
  templateUrl: './showcase-search-box.component.html',
  styleUrls: ['./showcase-search-box.component.scss']
})
export class ShowcaseSearchBoxComponent extends ShowcaseSearchBaseComponent {
  resultsCountToSearch: number | undefined = 5;

  constructor(private router: Router,
              protected productsService: ProductsService) {
    super(productsService);
  }

  onSubmit(): void {
    if (this.fm.valid) {
      this.router.navigate(['/search'], {queryParams: {keyword: this.fm.controls.keyword.value}});
    }
  }

}
