import { IAttributeValueDomain } from ".";
import { API_DOMAIN } from "../../const";
import { BaseDomain } from "../../infrastructure/base";
import { constructorProvide } from "../../infrastructure/ioc";

@constructorProvide(API_DOMAIN.ATTRIBUTE_VALUE)
export class AttributeValueDomain extends BaseDomain<IAttributeValueDomain> implements IAttributeValueDomain {
  get id() {
    return this.context.id;
  }

  get attributeId() {
    return this.context.attributeId;
  }

  get value() {
    return this.context.value;
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

  json(): IAttributeValueDomain {
    const {
      id,
      attributeId,
      value,
      status,
      createdAt,
      updatedAt,
    } = this;
    return {
      id,
      attributeId,
      value,
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

  protected nameContext = API_DOMAIN.ATTRIBUTE_VALUE;
}