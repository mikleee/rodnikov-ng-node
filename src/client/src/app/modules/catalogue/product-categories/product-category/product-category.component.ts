import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductCategory} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductCategoryService} from "../product-category.service";


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  categoryState: ViewState = new ViewState();
  categoryFormState: ViewState = new ViewState(ViewStateState.READY);
  category: ProductCategory = {} as ProductCategory;
  categoryForm: FormGroup = this.buildCategoryForm(this.category);


  constructor(private route: ActivatedRoute,
              protected categoriesService: ProductCategoryService) {

  }

  submitCategoryForm() {
    if (this.categoryForm.valid) {
      this.categoryForm.disable();
      this.categoryFormState.inProgress();
      this.categoriesService.submitProductCategory(this.categoryForm.value)
        .then(
          value => {
            this.categoryForm.enable();
            this.resolveGroup(value, ViewStateState.READY);
          },
          reason => {
            this.categoryForm.enable();
            this.resolveGroup({} as ProductCategory, ViewStateState.ERROR, reason)
          },
        );
    }
  }

  buildCategoryForm(category: ProductCategory | undefined) {
    return new FormGroup({
      id: new FormControl(category?.id, []),
      name: new FormControl(category?.name, [Validators.required]),
      parent: new FormControl(category?.parent)
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.categoryState.inProgress();
      this.categoriesService.getProductCategory(id)
        .then(
          value => this.resolveGroup(value, ViewStateState.READY),
          reason => this.resolveGroup({} as ProductCategory, ViewStateState.ERROR, reason)
        );
    } else {
      this.resolveGroup({} as ProductCategory, ViewStateState.READY)
    }
  }

  resolveGroup(value: ProductCategory, state: ViewStateState, message?: string) {
    this.categoryState.setState(state);
    this.categoryState.setMessage(message);
    this.category = value
    this.categoryForm = this.buildCategoryForm(value);
  }

  onCategoryChange(category: ProductCategory) {
    debugger;
    this.categoryForm?.controls.parent?.setValue(category?.id)
  }


}
