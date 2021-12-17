import { IProductSKUDomain } from ".";
import { API_DOMAIN } from "../../const";
import { BaseDomain } from "../../infrastructure/base";
import { constructorProvide } from "../../infrastructure/ioc";

@constructorProvide(API_DOMAIN.PRODUCT_SKU)
export class ProductSKUDomain extends BaseDomain<IProductSKUDomain> implements IProductSKUDomain {
    get id() {
        return this.context.id;
      }
    
      get code() {
        return this.context.code;
      }
    
      get productId() {
        return this.context.productId;
      }
    
      get quantity() {
        return this.context.quantity;
      }
    
      get currentPrice() {
        return this.context.currentPrice;
      }
    
      get price() {
        return this.context.price;
      }
    
      get image() {
        return this.context.image
      }
    
      get description() {
        return this.context.description;
      }
    
      get status() {
        return this.context.status;
      }
    
      get slug() {
        return this.context.slug;
      }
    
      get createdAt() {
        return this.context.createdAt;
      }
    
      get updatedAt() {
        return this.context.updatedAt;
      }
    
      get attributeValues() {
        return this.context.attributeValues;
      }
    
      json(): IProductSKUDomain {
        const {
          id,
          code,
          productId,
          quantity,
          currentPrice,
          attributeValues,
          price,
          image,
          status,
          description,
          slug,
          createdAt,
          updatedAt
        } = this;
        return {
          id,
          code,
          productId,
          quantity,
          currentPrice,
          attributeValues,
          price,
          image,
          status,
          description,
          slug,
          createdAt,
          updatedAt
        };
      }
    
      toString() {
        return JSON.stringify(this.json());
      }
    
      toJSON(){
        return this.json();
      }
    
      protected nameContext = API_DOMAIN.PRODUCT_SKU; 
}