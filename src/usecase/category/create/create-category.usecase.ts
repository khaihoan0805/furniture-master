import { API_DOMAIN, CATEGORY_OUTPUT, CATEGORY_USECASE, TYPES } from "../../../const";
import { ICreateCategoryInput, ICreateCategoryOutput } from "../../../controller";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { ICategoryRepository, Operators } from "../../../infrastructure";
import { constructorProvide, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateCaterogyUsecase extends ICreateUsecase<ICategoryDomain, ICreateCategoryInput, ICreateCategoryOutput> {}

@singletonNamedProvide(TYPES.USECASE, CATEGORY_USECASE.CREATE)
export class CreateCategoryUsecase extends CreateUsecase<ICategoryDomain, ICreateCategoryInput, ICreateCategoryOutput> {
    get DOMAIN() {
        return API_DOMAIN.CATEGORY;
    }

    get id() {
        return CATEGORY_USECASE.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
        repository: ICategoryRepository
    ) {
        super(repository)
    }

    async validate(entity: ICategoryDomain): Promise<void> {
        const isExisted = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: entity.name }
            ]
        })

        if (isExisted.length > 0) {
            throw this.errorFactory.unauthorizedError(`This category name: ${entity.name} is already exsited.`)
        }
    }
}