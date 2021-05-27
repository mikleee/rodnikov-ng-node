import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductImage} from "../../catalogue.models";
import {ViewState} from "../../../shared/model/view-state.model";
import {ProductImageServiceService} from "./product-image-service.service";

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit, OnChanges {
  @Input() productId?: string;
  @Input() images: ProductImage[] = [];

  images1: ProductImageWithState[] = [];

  state: ViewState = new ViewState();
  imagesToUpload: File[] = [];

  constructor(private productImageServiceService: ProductImageServiceService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.images) {
      this.initImages(changes.images.currentValue);
    }
  }

  deleteProductImage(image: ProductImageWithState) {
    image.state.inProgress()
    this.productImageServiceService.deleteProductImage(image.id)
      .then(
        value => {
          image.state.ready();
          this.images = this.images.filter(i => i.id != image.id);
          this.initImages(this.images);
        },
        reason => image.state.error(reason.message)
      );
  }

  makeImageMain(image: ProductImageWithState) {
    image.state.inProgress()
    this.productImageServiceService.makeImageMain(this.productId as string, image.id)
      .then(
        value => {
          image.state.ready();
          this.images.forEach(i => i.main = i.id === image.id)
          this.initImages(this.images);
        },
        reason => image.state.error(reason.message)
      );
  }


  onProductImagesChange(files: File[]) {
    this.imagesToUpload = files;
    // noinspection JSIgnoredPromiseFromCall
    this.uploadProductImages(this.productId);
  }

  uploadProductImages(productId?: string): Promise<ProductImage[]> {
    if (productId && this.imagesToUpload.length) {
      return this.uploadProductImagesImpl(productId);
    } else {
      return Promise.resolve([]);
    }
  }

  uploadProductImagesImpl(productId: string): Promise<ProductImage[]> {
    let request = new FormData();
    request.append('id', productId);
    this.imagesToUpload.forEach(i => request.append('images', i as Blob));

    this.state.inProgress();
    let result = this.productImageServiceService.uploadProductImages(request);
    result.then(
      value => {
        this.state.ready();
        this.images = this.images.concat(value);
        this.initImages(this.images);
        this.imagesToUpload = [];
      },
      reason => this.state.error(reason.message)
    );
    return result
  }

  initImages(images: ProductImage[] = []) {
    this.images1 = images.map(i => {
      const result = i as ProductImageWithState;
      result.state = new ViewState();
      return result;
    })
  }

}

export interface ProductImageWithState extends ProductImage {
  state: ViewState;
}
