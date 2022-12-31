import { API_DOMAIN, PRODUCT_STEP, PRODUCT_USECASE, TYPES, USER_USECASE } from "../../../const";
import { ICreateProductInput, ICreateProductOutput } from "../../../controller";
import { IProductDomain } from "../../../domain";
import { IProductRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";
import { IAddProductCategoryStep } from "./steps";

export interface ICreateProductUsecase extends ICreateUsecase<IProductDomain, ICreateProductInput, ICreateProductOutput> { }

@singletonNamedProvide(TYPES.USECASE, PRODUCT_USECASE.CREATE)
export class CreateProductUsecase extends CreateUsecase<IProductDomain, ICreateProductInput, ICreateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_USECASE.CREATE;
    }

    @namedInject(TYPES.STEP, PRODUCT_STEP.ADD_PRODUCT_CATEGORY)
    protected addProductCategoryStep: IAddProductCategoryStep;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async validate(entity: IProductDomain): Promise<void> {
        const isExistedProduct = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: [entity.name] }
            ]
        })

        if (isExistedProduct.length > 0) {
            throw this.errorFactory.unauthorizedError(`This Product name: ${entity.name} is alread existed.`)
        }
    }

    async execute(input: ICreateProductInput): Promise<ICreateProductOutput> {
        const output = await super.execute(input);

        const product = output.entity;

        const categories = await this.addProductCategoryStep.run(product)
        product.categories = categories;

        output.entity = product;

        return output;
    }
}