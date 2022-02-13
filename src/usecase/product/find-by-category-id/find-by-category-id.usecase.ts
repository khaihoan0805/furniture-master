import { API_DOMAIN, PRODUCT_STEP, PRODUCT_USECASE, TYPES } from "../../../const";
import { IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput } from "../../../controller";
import { ICategoryDomain, IEntityFactory } from "../../../domain";
import { ICategoryRepository, IErrorFactory, IProductCategoryRepository, IProductRepository, Operators } from "../../../infrastructure";
import { BaseUsecase, IBaseUsecase } from "../../../infrastructure/base";
import { inject, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IFindProductByCateogryIdStep, IFindProductDetailStep } from "./steps";

export interface IFindProductByCategoryIdUsecase extends IBaseUsecase<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> { }

@singletonNamedProvide(TYPES.USECASE, PRODUCT_USECASE.FIND_BY_CATEGORY_ID)
export class FindProductByCategoryIdUsecase extends BaseUsecase<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> implements IBaseUsecase<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> {
    get id() {
        return PRODUCT_USECASE.FIND_BY_CATEGORY_ID;
    }

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    @namedInject(TYPES.STEP, PRODUCT_STEP.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdStep: IFindProductByCateogryIdStep;

    @namedInject(TYPES.STEP, PRODUCT_STEP.FIND_PRODUCT_DETAILS)
    protected findProductDetailsStep: IFindProductDetailStep;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
    protected categoryRepository: ICategoryRepository;

    async validate(categoryId: number): Promise<ICategoryDomain> {
        const isExistedCategory = await this.categoryRepository.findById(categoryId)

        if (!isExistedCategory) {
            throw this.errorFactory.unauthorizedError(`This category ${categoryId} is not existed.`)
        }

        return isExistedCategory;
    }

    async execute(input: IFindProductByCategoryIdInput): Promise<IFindProductByCategoryIdOutput> {
        const isExistedCategory: ICategoryDomain = await this.validate(<number>input.categoryId)

        const productsCategory = await this.findProductByCategoryIdStep.run(isExistedCategory);

        const products = await this.findProductDetailsStep.run(productsCategory)

        return {
            message: `find by category id successfully`,
            entities: products
        }
    }
}