import {BaseModel} from "../shared/model/base.model";

export class ProductsFilter {
  category?: string;
  suppliers: string[] = [];
  priceFrom?: number;
  priceTo?: number;
  keyword?: string;
  name?: string;


  constructor(keyword?: string,
              name?: string,
              category?: string,
              suppliers?: string[] | string,
              priceFrom?: number,
              priceTo?: number) {
    this.name = name;
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
    this.keyword = keyword;
  }

}


export interface Product extends BaseModel {
  name: string;
  description: string;
  supplier: string,
  category: string,
  mainImage: string,
  additionalImages: string[],
  priceUplift: number,
  cost: number,
  price: number,
  priceUah: number,
  margin: number,
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
