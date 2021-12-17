import { API_DOMAIN, TYPES } from '../const';
import { IDomain } from '../infrastructure/base/domain';
import { singletonProvide } from '../infrastructure/ioc';
import { AddressDomain } from './address';
import { AttributeDomain } from './attribute';
import { AttributeValueDomain } from './attribute-value';
import { CategoryDomain } from './category';
import { ChannelDomain } from './channel';
import { CustomerDomain } from './customer/customer.domain';
import { ImageDomain } from './image';
import { MetadataDomain } from './metadata';
import { OrderDomain } from './order';
import { OrderItemDomain } from './order-item';
import { PermissionDomain } from './permission';
import { ProductDomain } from './product';
import { ProductAttributeDomain } from './product-attribute';
import { ProductCategoryDomain } from './product-caterogy';
import { ProductImageDomain } from './product-image';
import { ProductSKUDomain } from './product-sku';
import { ProductSKUAttributeValueDomain } from './product-sku-attribute-value';
import { SourceDomain } from './source';
import { UserDomain } from './user';

export interface IEntityFactory {
    create(type: string, data: any): IDomain
}

@singletonProvide(TYPES.ENTITY_FACTORY)
export class EntityFactory {
    create(type: string, data:any) {
        switch(type) {
            case API_DOMAIN.USER.toString(): return new UserDomain(data).json();

            case API_DOMAIN.PRODUCT.toString(): return new ProductDomain(data).json();

            case API_DOMAIN.CATEGORY.toString(): return new CategoryDomain(data).json();

            case API_DOMAIN.ATTRIBUTE.toString(): return new AttributeDomain(data).json();

            case API_DOMAIN.PRODUCT_CATEGORY.toString(): return new ProductCategoryDomain(data).json();

            case API_DOMAIN.PRODUCT_ATTRIBUTE.toString(): return new ProductAttributeDomain(data).json();

            case API_DOMAIN.ADDRESS.toString(): return new AddressDomain(data).json();
            
            case API_DOMAIN.CHANNEL.toString(): return new ChannelDomain(data).json();
            
            case API_DOMAIN.CUSTOMER.toString(): return new CustomerDomain(data).json();

            case API_DOMAIN.IMAGE.toString(): return new ImageDomain(data).json();

            case API_DOMAIN.METADATA.toString(): return new MetadataDomain(data).json();

            case API_DOMAIN.ORDER.toString(): return new OrderDomain(data).json();
            
            case API_DOMAIN.ORDER_ITEM.toString(): return new OrderItemDomain(data).json();

            case API_DOMAIN.PERMISSION.toString(): return new PermissionDomain(data).json();

            case API_DOMAIN.PRODUCT_IMAGE.toString(): return new ProductImageDomain(data).json();

            case API_DOMAIN.SOURCE.toString(): return new SourceDomain(data).json();

            case API_DOMAIN.PRODUCT_SKU.toString(): return new ProductSKUDomain(data).json();

            case API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE.toString(): return new ProductSKUAttributeValueDomain(data).json();

            case API_DOMAIN.ATTRIBUTE_VALUE.toString(): return new AttributeValueDomain(data).json();
            
            default: throw new Error(`${type} is not suppported.`)
        }
    }
}