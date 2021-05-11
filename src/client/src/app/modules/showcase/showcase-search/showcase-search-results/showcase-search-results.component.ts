import {Component, OnInit} from '@angular/core';
import {ShowcaseSearchBaseComponent} from "../showcase-search-base-component";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../catalogue/product/products.service";
import {ProductCategoryService} from "../../../catalogue/product-categories/product-category.service";
import {ViewState} from "../../../shared/model/view-state.model";
import {forkJoin} from "rxjs";
import {first} from "rxjs/operators";
import {ProductCategory} from "../../../catalogue/catalogue.models";


@Component({
  selector: 'app-showcase-search-results',
  templateUrl: './showcase-search-results.component.html',
  styleUrls: ['./showcase-search-results.component.scss']
})
export class ShowcaseSearchResultsComponent extends ShowcaseSearchBaseComponent implements OnInit {
  resultsCountToSearch: number | undefined = undefined;

  pageState: ViewState = new ViewState();
  categories: ProductCategory[] = [];

  constructor(
    private categoryService: ProductCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected productsService: ProductsService) {
    super(productsService);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        let keyword = params['keyword'];
        this.fm.controls.keyword.setValue(keyword);
        this.search(keyword);
      })

    this.loadPage();
  }

  loadPage() {
    this.pageState.inProgress();
    forkJoin([
      this.categoryService.getProductCategories()
    ])
      .pipe(first())
      .subscribe(
        (value) => {
          this.categories = value[0];
          this.pageState.ready();
        },
        error => this.pageState.error(error)
      );
  }


}
