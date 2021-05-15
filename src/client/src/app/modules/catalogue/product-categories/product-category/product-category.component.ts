import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductCategory} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductCategoryService} from "../product-category.service";
import {forkJoin, of} from "rxjs";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  state: ViewState = new ViewState();
  categoryFormState: ViewState = new ViewState(ViewStateState.READY);
  category: ProductCategory = {} as ProductCategory;
  fm: FormGroup;
  categories: ProductCategory[] = [];


  constructor(private route: ActivatedRoute,
              protected categoriesService: ProductCategoryService) {
    this.fm = new FormGroup({});
    this.populateCategoryForm(this.category);
  }

  submitCategoryForm() {
    if (this.fm.valid) {
      this.fm.disable();
      this.categoryFormState.inProgress();
      this.categoriesService.submitProductCategory(this.fm.value)
        .then(
          value => {
            this.fm.enable();
            this.resolveProductCategoryPage(this.categories, value, ViewStateState.READY);
          },
          reason => {
            this.fm.enable();
            this.resolveProductCategoryPage(this.categories, {} as ProductCategory, ViewStateState.ERROR, reason)
          },
        );
    }
  }

  populateCategoryForm(category: ProductCategory | undefined) {
    this.fm.setControl('id', new FormControl(category?.id, []));
    this.fm.setControl('name', new FormControl(category?.name, [Validators.required]));
    this.fm.setControl('parent', new FormControl(category?.parent, []));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.state.inProgress();
    forkJoin([
      this.categoriesService.getProductCategories(),
      id ? this.categoriesService.getProductCategory(id) : of({} as ProductCategory),
    ])
      .pipe(first())
      .subscribe(
        value => this.resolveProductCategoryPage(value[0], value[1], ViewStateState.READY, undefined),
        error => this.resolveProductCategoryPage([], {} as ProductCategory, ViewStateState.ERROR, error.message)
      )
  }

  resolveProductCategoryPage(categories: ProductCategory[], category: ProductCategory, state: ViewStateState, message?: string) {
    this.state.setState(state);
    this.state.setMessage(message);
    this.category = category
    this.categories = categories;
    this.populateCategoryForm(category)
  }

}
