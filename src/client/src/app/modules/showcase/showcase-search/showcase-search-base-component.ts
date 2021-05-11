import {Injectable, OnDestroy} from '@angular/core';
import {ViewState} from "../../shared/model/view-state.model";
import {of, Subscription} from "rxjs";
import {DatatableResponse} from "../../shared/model/datatable.model";
import {Product} from "../../catalogue/catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../catalogue/product/products.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export abstract class ShowcaseSearchBaseComponent implements OnDestroy {
  state: ViewState = new ViewState();
  search$?: Subscription;
  keyword$?: Subscription;
  results: DatatableResponse<Product> = new DatatableResponse<Product>();
  cache: { [key: string]: DatatableResponse<Product> } = {};
  resultsCountToSearch: number | undefined;

  fm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required, Validators.minLength(3)])
  });


  protected constructor(
    protected productsService: ProductsService,
  ) {

  }

  trySearch() {
    if (this.fm.valid) {
      this.search(this.fm.controls.keyword.value);
    }
  }

  search(keyword: string) {
    this.state.inProgress();

    let observable;
    if (this.cache[keyword]) {
      observable = of(this.cache[keyword]);
    } else {
      observable = this.productsService.searchProducts(keyword, this.resultsCountToSearch)
        .pipe(first())
    }

    this.search$?.unsubscribe();
    this.search$ = observable.subscribe(
      (value) => {
        this.results = value;
        this.cache[keyword] = value;
        this.onProductsRetrieved(value);
        this.state.ready();
      },
      error => this.state.error(error.message)
    )
  }

  onProductsRetrieved(result: DatatableResponse<Product>) {

  }

  ngOnDestroy(): void {
    this.keyword$?.unsubscribe();
    this.search$?.unsubscribe();
  }
}
