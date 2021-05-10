import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../catalogue/product/products.service";
import {ViewState} from "../../../shared/model/view-state.model";
import {of, Subscription} from "rxjs";
import {DatatableResponse} from "../../../shared/model/datatable.model";
import {Product} from "../../../catalogue/catalogue.models";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-showcase-search-box',
  templateUrl: './showcase-search-box.component.html',
  styleUrls: ['./showcase-search-box.component.scss']
})
export class ShowcaseSearchBoxComponent implements OnInit, OnDestroy {
  state: ViewState = new ViewState();
  search$?: Subscription;
  keyword$?: Subscription;
  results: DatatableResponse<Product> = new DatatableResponse<Product>();
  cache: { [key: string]: DatatableResponse<Product> } = {};

  fm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fm.valid) {
      this.router.navigate(['/search'], {queryParams: {keyword: this.fm.controls.keyword.value}});
    }
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
      observable = this.productsService.searchProducts(keyword, 5)
        .pipe(first())
    }

    this.keyword$?.unsubscribe();
    this.keyword$ = observable.subscribe(
      (value) => {
        this.results = value;
        this.cache[keyword] = value;
        this.state.ready();
      },
      error => this.state.error(error.message)
    )
  }

  ngOnDestroy(): void {
    this.keyword$?.unsubscribe();
    this.search$?.unsubscribe();
  }

}
