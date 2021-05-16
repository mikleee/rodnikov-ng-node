import {Component, OnInit} from '@angular/core';
import {ViewState} from "../../shared/model/view-state.model";
import {Product, ProductAttribute, ProductCategory, ProductSupplier} from "../../catalogue/catalogue.models";
import {forkJoin, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../catalogue/product/products.service";
import {ProductSuppliersService} from "../../catalogue/product-suppliers/product-suppliers.service";
import {ProductCategoryService} from "../../catalogue/product-categories/product-category.service";
import {first} from "rxjs/operators";
import {ProductAttributeService} from "../../catalogue/product/product-attributes/product-attribute.service";

@Component({
  selector: 'app-showcase-product',
  templateUrl: './showcase-product.component.html',
  styleUrls: ['./showcase-product.component.scss']
})
export class ShowcaseProductComponent implements OnInit {
  state: ViewState = new ViewState();

  suppliers: ProductSupplier[] = [];
  categories: ProductCategory[] = [];
  product: Product = {} as Product;
  attributes: ProductAttribute[] = [];


  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private suppliersService: ProductSuppliersService,
              private productAttributeService: ProductAttributeService,
              private categoryService: ProductCategoryService) {
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.state.inProgress();
    forkJoin([
      this.productsService.getProduct(id),
      this.suppliersService.getSuppliers(),
      this.categoryService.getProductCategories(),
      this.productAttributeService.getAttributesForProduct(id),
    ])
      .pipe(first())
      .subscribe(
        (value) => {
          this.product = value[0];
          this.suppliers = value[1];
          this.categories = value[2];
          this.product.attributes = value[3];
          this.state.ready();
          (this.route.data as Subject<Product>).next(this.product);
        },
        error => this.state.error(error)
      )
  }


}
