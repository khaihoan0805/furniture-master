import { TYPES } from "../../../const";
import { IEntityFactory } from "../../../domain";
import { Criteria, IErrorFactory } from "../../../infrastructure";
import { BaseUsecase, IBaseHttpInput, IBaseHttpOutput, IDomain } from "../../../infrastructure/base";
import { IRepository } from "../../../infrastructure/repository/base";
import { injectable, inject } from '../../../infrastructure/ioc';

export interface IPaginateUsecase<D extends IDomain, I extends IBaseHttpInput & { limit?: number, offset?: number }, O extends IBaseHttpOutput> {
    execute(input: I): Promise<O>
}

@injectable()
export abstract class PaginateUsecase<D extends IDomain, I extends IBaseHttpInput & { limit?: number, offset?: number }, O extends IBaseHttpOutput> extends BaseUsecase<I, O> {
    protected repository: IRepository<D>;
    abstract DOMAIN: symbol;

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    constructor(repository: IRepository<D>) {
        super();
        this.repository = repository;
    }

    async execute(input: I): Promise<O> {
        const criteria: Criteria = {
            limit: input.limit,
            offset: input.offset
        }

        try {
            const docs = await this.repository.paginate(criteria)

            const output = <O>{
                data: {
                    message: `Select successfully`,
                    entities: docs
                }
            }

            return output.data;
        }
        catch (error) {
            this.log.error(error)
            throw this.errorFactory.unauthorizedError(`Usecase Error`);
        }

    }
}