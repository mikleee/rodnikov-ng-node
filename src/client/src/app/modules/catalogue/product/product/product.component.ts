import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {Product, ProductCategory, ProductSupplier} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {forkJoin, of} from "rxjs";
import {ProductCategoryService} from "../../product-categories/product-category.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  state: ViewState = new ViewState();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];
  product: Product = {} as Product;

  productFormState: ViewState = new ViewState(ViewStateState.READY);
  fm: FormGroup = this.buildProductForm(this.product);

  mainImage?: File;
  images?: File[];


  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private suppliersService: ProductSuppliersService,
              private categoryService: ProductCategoryService) {

  }

  submitProductForm() {
    if (this.fm.valid) {
      this.fm.disable();
      this.productFormState.inProgress();

      let request = new FormData();
      request.append('product', JSON.stringify(this.fm.value));
      if (this.mainImage) {
        request.append('mainImage', this.mainImage as Blob);
      }
      this.images?.forEach(i => request.append('additionalImages', i as Blob))

      this.productsService.submitProduct(request)
        .then(
          value => {
            this.fm.enable();
            this.productFormState.ready();
            this.product = value;
            this.fm = this.buildProductForm(this.product);
          },
          reason => {
            this.fm.enable();
            this.productFormState.error(reason.message)
          },
        );
    }
  }

  buildProductForm(product: Product | undefined) {
    return new FormGroup({
      id: new FormControl(product?.id, []),
      name: new FormControl(product?.name, [Validators.required]),
      description: new FormControl(product?.description),
      supplier: new FormControl(product?.supplier, [Validators.required]),
      category: new FormControl(product?.category, [Validators.required]),
      cost: new FormControl(product?.cost, [Validators.required]),
      priceUplift: new FormControl(product?.priceUplift, []),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.state.inProgress();
    forkJoin([
      id ? this.productsService.getProduct(id) : of({} as Product),
      this.suppliersService.getSuppliers(),
      this.categoryService.getProductCategories()
    ])
      .pipe(first())
      .subscribe(
        (value) => {
          this.product = value[0];
          this.suppliers = value[1];
          this.categories = value[2];
          this.fm = this.buildProductForm(this.product);
          this.state.ready();
        },
        error => this.state.error(error)
      )
  }

  onProductMainImageChange(files: File[]) {
    this.mainImage = files[0]
  }

  onProductAdditionalImagesChange(files: File[]) {
    this.images = files
  }

}
