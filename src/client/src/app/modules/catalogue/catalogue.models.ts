import {BaseModel} from "../shared/model/base.model";

export class ProductsFilter {
  category?: string;
  suppliers: string[] = [];
  priceFrom?: number;
  priceTo?: number;
  name?: string;
  code?: string;


  constructor(name?: string,
              code?: string,
              category?: string,
              suppliers?: string[] | string,
              priceFrom?: number,
              priceTo?: number) {
    this.name = name;
    this.code = code;
    this.category = category;
    if (!suppliers) {
      this.suppliers = [];
    } else if (suppliers instanceof Array) {
      this.suppliers = suppliers;
    } else {
      this.suppliers = [suppliers];
    }
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
  }

  isEmpty() {
    return this.category == undefined
      && !this.suppliers?.length
      && this.priceFrom == undefined
      && this.priceTo == undefined
      && this.name == undefined
      && this.code == undefined
  }

}


export interface Product extends BaseModel {
  code: string;
  name: string;
  description: string;
  supplier: string,
  category: string,
  priceUplift: number,
  cost: number,
  price: number,
  priceUah: number,
  margin: number,
  attributes: ProductAttribute[],
  images: ProductImage[]
}

export interface ProductSupplier extends BaseModel {
  name: string;
  logo?: string;
}

export interface ProductCategory extends BaseModel {
  name: string;
  parent: string;
  categories: ProductCategory[];
}

export interface ProductAttribute extends BaseModel {
  name: string;
  value: string;
  template: string;
}

export interface ProductAttributeTemplate extends BaseModel {
  name: string;
}

export interface ProductImage extends BaseModel {
  main: boolean;
}
