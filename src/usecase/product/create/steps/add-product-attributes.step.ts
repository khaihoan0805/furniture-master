import { API_DOMAIN, PRODUCT_STEP, TYPES } from "../../../../const";
import { IAttributeDomain, IProductAttributeDomain, IProductDomain } from "../../../../domain";
import { IAttributeRepository, IProductAttributeRepository } from "../../../../infrastructure";
import { BaseStep, IStep } from "../../../../infrastructure/base";
import { namedInject, singletonNamedProvide } from "../../../../infrastructure/ioc";

export interface IAddProductAttributesStep extends IStep<IProductDomain, IAttributeDomain[]> { }

@singletonNamedProvide(TYPES.STEP, PRODUCT_STEP.ADD_PRODUCT_ATTRIBUTES)
export class AddProductAttributesStep extends BaseStep<IProductDomain, IAttributeDomain[]> implements IAddProductAttributesStep {
    get id() {
        return PRODUCT_STEP.ADD_PRODUCT_ATTRIBUTES;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
    protected attributeRepository: IAttributeRepository

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
    protected productAttributeRepository: IProductAttributeRepository

    async run(input: IProductDomain): Promise<IAttributeDomain[]> {
        const attributes = await Promise.all(input.attributes.map(async attribute => {
            const isExisted = await this.attributeRepository.findById(<number>attribute)

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This attributeID ${attribute} is not existed.`)
            }

            return isExisted;
        }))

        for (let index = 0; index < attributes.length; index++) {
            const entity = <IProductAttributeDomain>this.entityFactory.create(API_DOMAIN.PRODUCT_ATTRIBUTE.toString(), {
                productId: input.id,
                attributeId: attributes[index].id,
                status: 1
            })

            await this.productAttributeRepository.create(entity)
        }

        return attributes;
    }
}