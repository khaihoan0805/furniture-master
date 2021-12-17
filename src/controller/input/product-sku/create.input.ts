import { Request } from "express";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateProductSKUInput extends ICreateInput {
  code: string;
  productId: number;
  image: string;
  status: number;
  quantity: number;
  currentPrice: number;
  price: number;
  slug: string;
  description: string;
  attributeValues?: (IProductSKUAttributeValueDomain | null) | number[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProductSKUInput extends CreateInput<ICreateProductSKUInput> implements ICreateProductSKUInput {
  constructor(req: Request) {
    super(req)
  }

  get code() {
    return this.input.code;
  }

  get productId() {
    return this.input.productId;
  }

  get quantity() {
    return this.input.quantity;
  }

  get currentPrice() {
    return this.input.currentPrice;
  }

  get price() {
    return this.input.price;
  }

  get image() {
    return this.input.image
  }

  get description() {
    return this.input.description;
  }

  get status() {
    return this.input.status;
  }

  get slug() {
    return this.input.slug;
  }

  get createdAt() {
    return this.input.createdAt;
  }

  get updatedAt() {
    return this.input.updatedAt;
  }

  get attributeValues() {
    return this.input.attributeValues;
  }
}