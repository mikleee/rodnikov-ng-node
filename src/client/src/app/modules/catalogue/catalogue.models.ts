import {BaseModel} from "../shared/model/base.model";

export class ProductsFilter {
  category: string | undefined = undefined;
  suppliers: string[] = [];
  priceFromUah: number | undefined = undefined;
  priceToUah: number | undefined = undefined;
  keyword: string | undefined;
  name: string | undefined;
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
