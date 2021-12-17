import { IProductSKUAttributeValueDomain } from ".";
import { API_DOMAIN } from "../../const";
import { BaseDomain } from "../../infrastructure/base";
import { constructorProvide } from "../../infrastructure/ioc";

constructorProvide(API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
export class ProductSKUAttributeValueDomain extends BaseDomain<IProductSKUAttributeValueDomain> implements IProductSKUAttributeValueDomain {
    get id() {
        return this.context.id;
    }

    get attributeId() {
        return this.context.attributeId;
    }

    get attributeValueId() {
        return this.context.attributeValueId;
    }

    get attributeName() {
        return this.context.attributeName;
    }

    get attributeValue() {
        return this.context.attributeValue;
    }

    get skuId() {
        return this.context.skuId;
    }

    get status() {
        return this.context.status;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    json(): IProductSKUAttributeValueDomain {
        const {
            id,
            skuId,
            attributeId,
            attributeValueId,
            status,
            attributeValue,
            attributeName,
            createdAt,
            updatedAt,
        } = this;
        return {
            id,
            skuId,
            attributeId,
            attributeValueId,
            attributeValue,
            attributeName,
            status,
            createdAt,
            updatedAt,
        };
    }

    toString() {
        return JSON.stringify(this.json());
    }

    toJSON() {
        return this.json();
    }

    protected nameContext = API_DOMAIN.PRODUCT_ATTRIBUTE;
}