import {Injectable} from '@angular/core';
import {ProductImage} from "../../catalogue.models";
import {HttpService} from "../../../shared/service/http.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductImageServiceService {

  constructor(private http: HttpService) {

  }


  uploadProductImages(data: FormData): Promise<ProductImage[]> {
    return this.http.postMultipartFormData('/api/product-images/upload', data)
  }

  makeImageMain(productId: string, imageId: string): Promise<any> {
    return this.http.post('/api/product-images/make-main', {productId: productId, imageId: imageId})
      .pipe(first())
      .toPromise()
  }

  deleteProductImage(id: string): Promise<any> {
    return this.http.post('/api/product-images/delete/' + id)
      .pipe(first())
      .toPromise();
  }
}
