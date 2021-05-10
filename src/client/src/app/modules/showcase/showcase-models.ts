import {Product, ProductSupplier} from "../catalogue/catalogue.models";

export interface Showcase {
  suppliers: ProductSupplier[],
  products: Product[],
  total: number,
  priceRange: PriceRange,
}

export interface PriceRange {
  min: number,
  max: number,
}
