import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsBaseComponent} from "../products-base.component";
import {ProductsService} from "../products.service";
import {ProductSuppliersService} from "../../product-suppliers/product-suppliers.service";
import {ProductGroupService} from "../../product-groups/product-group.service";
import {Product} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends ProductsBaseComponent implements OnInit, OnDestroy {
  productState: ViewState = new ViewState();
  productFormState: ViewState = new ViewState(ViewStateState.READY);
  product: Product = {} as Product;
  productForm: FormGroup = this.initProductForm(this.product);
  mainImage$: Subject<File[]> = new Subject<File[]>();
  mainImage?: File;
  images$: Subject<File[]> = new Subject<File[]>();
  images?: File[];


  constructor(private route: ActivatedRoute,
              protected productsService: ProductsService,
              protected suppliersService: ProductSuppliersService,
              protected groupsService: ProductGroupService) {
    super(productsService, suppliersService, groupsService);
  }

  submitProductForm() {
    if (this.productForm.valid) {
      this.productForm.disable();
      this.productFormState.inProgress();

      let request = new FormData();
      request.append('product', JSON.stringify(this.productForm.value));
      if (this.mainImage) {
        request.append('mainImage', this.mainImage as Blob);
      }
      this.images?.forEach(i => request.append('additionalImages', i as Blob))

      this.productsService.submitProduct(request)
        .then(
          value => {
            this.productForm.enable();
            this.productFormState.ready();
            this.product = value;
            this.initProductForm(this.product);
          },
          reason => {
            this.productForm.enable();
            this.productFormState.error(reason.message)
          },
        );
    }
  }

  initProductForm(product: Product | undefined): FormGroup {
    return this.productForm = this.buildProductForm(product);
  }

  buildProductForm(product: Product | undefined) {
    return new FormGroup({
      id: new FormControl(product?.id, []),
      name: new FormControl(product?.name, [Validators.required]),
      description: new FormControl(product?.description),
      supplier: new FormControl(product?.supplier, [Validators.required]),
      group: new FormControl(product?.group, [Validators.required]),
      cost: new FormControl(product?.cost, [Validators.required]),
      priceUplift: new FormControl(product?.priceUplift, []),
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadProduct();
    this.mainImage$.subscribe(files => this.mainImage = files[0]);
    this.images$.subscribe(files => this.images = files);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.images$.unsubscribe();
    this.mainImage$.unsubscribe();
  }

  loadProduct() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productState.inProgress();
      this.productsService.getProduct(id)
        .then(
          value => {
            this.productState.ready();
            this.product = value;
            this.initProductForm(this.product);
          },
          reason => this.productState.error(reason.message)
        );
    } else {
      this.productState.ready();
      this.product = {} as Product;
      this.initProductForm(this.product);
    }
  }

}
