import {BaseModel} from "../shared/model/base.model";

export class ProductsFilter {
  category?: string;
  suppliers: string[] = [];
  priceFrom?: number;
  priceTo?: number;
  name?: string;


  constructor(name?: string,
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
  }

  isEmpty() {
    return this.category == undefined
      && !this.suppliers?.length
      && this.priceFrom == undefined
      && this.priceTo == undefined
      && this.name == undefined
  }

}

export class ProductsCriteria {
  page?: Page;
  filter?: ProductsFilter;
  keyword?: string;

  isEmpty() {
    return this.keyword == undefined
      && (this.page == undefined || this.page.isEmpty())
      && (this.filter == undefined || this.filter.isEmpty())
  }
}

export class Page {
  page?: number;
  size?: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
  }

  isEmpty() {
    return this.page == undefined || this.size
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
