import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../../catalogue/catalogue.models";

@Pipe({
  name: 'productMainImage'
})
export class ProductMainImagePipe implements PipeTransform {

  transform(value: Product, ...args: unknown[]): string | undefined {
    let images = value.images;
    return (images.filter(i => i.main)[0] || images[0])?.id;
  }

}
