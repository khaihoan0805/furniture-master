import { IMetadataDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.METADATA)
export class MetadataDomain extends BaseDomain<IMetadataDomain> implements IMetadataDomain {
    get id() {
        return this.context.id;
    }

    get productId() {
        return this.context.productId;
    }

    get desciption() {
        return this.context.desciption;
    }

    get metaKeyword() {
        return this.context.metaKeyword;
    }
    
    get metaDesciption() {
        return this.context.metaKeyword;
    }

    get metaImage() {
        return this.context.metaImage;
    }

    get canonical() {
        return this.context.canonical;
    }

    get metaUrl() {
        return this.context.metaUrl;
    }

    get metaTitle() {
        return this.context.metaTitle;
    }

    get metaType() {
        return this.context.metaType;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get createdBy() {
        return this.context.createdBy;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    get updatedBy() {
        return this.context.updatedBy;
    }

    protected nameContext = API_DOMAIN.METADATA;

    json() {
        const {
            id,
            productId,
            desciption,
            metaKeyword,
            metaDesciption,
            metaImage,
            metaTitle,
            metaUrl,
            metaType,
            canonical,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        } = this;

        return {
            id,
            productId,
            desciption,
            metaKeyword,
            metaDesciption,
            metaImage,
            metaTitle,
            metaUrl,
            metaType,
            canonical,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}