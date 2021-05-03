import {BaseModel} from "./base.model";

export interface Document extends BaseModel {
  name: string;
  type: DocumentType;
  contentType: string;
  content: number[];
}

export enum DocumentType {
  PRODUCT_IMG = 'PRODUCT_IMG',
  PRODUCT_SUPPLIER_LOGO = 'PRODUCT_SUPPLIER_LOGO',
  PRODUCT_GROUP_IMG = 'PRODUCT_GROUP_IMG'
}
