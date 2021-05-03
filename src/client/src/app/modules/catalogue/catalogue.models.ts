import {BaseModel} from "../shared/model/base.model";



export interface Product extends BaseModel {
  name: string;
  description: string;
  price: number,
  uplift: number,
  supplier: string,
  group: string,
  images: string[]
}

export interface ProductSupplier extends BaseModel {
  name: string;
  logo?: string;
}

export interface ProductGroup extends BaseModel {
  name: string;
  parent: string;
  groups: ProductGroup[];
}
