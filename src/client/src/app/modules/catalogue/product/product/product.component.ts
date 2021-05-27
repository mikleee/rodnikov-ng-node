import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {Product, ProductCategory, ProductSupplier} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {forkJoin, of} from "rxjs";
import {ProductCategoryService} from "../../product-categories/product-category.service";
import {first} from "rxjs/operators";
import {ProductImagesComponent} from "../product-images/product-images.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id?: string;
  state: ViewState = new ViewState();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];
  product: Product = {} as Product;

  productFormState: ViewState = new ViewState(ViewStateState.READY);
  fm: FormGroup = new FormGroup({
    id: new FormControl(undefined, []),
    code: new FormControl(undefined, []),
    name: new FormControl(undefined, [Validators.required]),
    description: new FormControl(undefined),
    supplier: new FormControl(undefined, [Validators.required]),
    category: new FormControl(undefined, [Validators.required]),
    cost: new FormControl(undefined, [Validators.required]),
    priceUplift: new FormControl(undefined, []),
  });


  @ViewChild(ProductImagesComponent)
  private productImagesComponent!: ProductImagesComponent;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private suppliersService: ProductSuppliersService,
              private categoryService: ProductCategoryService) {

  }

  submitProductForm() {
    if (this.fm.valid) {
      this.fm.disable();
      this.productFormState.inProgress();

      this.submitProductFormInternal()
        .then(
          value => {
            if (!this.id) {
              this.router.navigate([value.id], {relativeTo: this.route});
              this.id = value.id;
            }

            this.fm.enable();
            this.productFormState.ready();
            this.product = value;
            this.initProductForm(this.product);
          },
          reason => {
            this.fm.enable();
            this.productFormState.error(reason.message)
          }
        );
    }
  }

  submitProductFormInternal(): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.productsService.submitProduct(this.fm.value)
        .then(
          value => {
            Promise.all([
              this.productImagesComponent.uploadProductImages(value.id),
            ])
              .then(
                value1 => {
                  value.images = value.images.concat(value1[0])
                  resolve(value);
                },
                reason => reject(reason)
              );
          },
          reason => reject(reason),
        );
    });
  }

  initProductForm(product: Product | undefined) {
    this.fm.controls.id.setValue(product?.id);
    this.fm.controls.code.setValue(product?.code);
    this.fm.controls.name.setValue(product?.name);
    this.fm.controls.description.setValue(product?.description);
    this.fm.controls.supplier.setValue(product?.supplier);
    this.fm.controls.category.setValue(product?.category);
    this.fm.controls.cost.setValue(product?.cost);
    this.fm.controls.priceUplift.setValue(product?.priceUplift);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadPage(this.id);
  }

  loadPage(id?: string) {
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
          this.initProductForm(this.product);
          this.state.ready();
        },
        error => this.state.error(error)
      )
  }


}
