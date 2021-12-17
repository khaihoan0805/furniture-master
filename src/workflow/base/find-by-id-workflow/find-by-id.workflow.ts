import { BaseWorkflow, IBaseHttpInput, IBaseHttpOutput, IDomain } from "../../../infrastructure/base";
import { IRepository } from "../../../infrastructure/repository/base";
import { inject, injectable, interfaces } from '../../../infrastructure/ioc';
import { TYPES } from "../../../const";
import { IEntityFactory } from "../../../domain";
import { IErrorFactory } from "../../../infrastructure";

export interface IFindByIdWorkflow<D extends IDomain, I extends IBaseHttpInput, O extends IBaseHttpOutput> {
    execute(input: I): Promise<O>
}

@injectable()
export abstract class FindByIdWorkflow<D extends IDomain, I extends IBaseHttpInput & { id: number }, O extends IBaseHttpOutput> extends BaseWorkflow<I, O>{
    protected repository: IRepository<D>
    abstract DOMAIN: symbol;

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    constructor(repository: IRepository<D>) {
        super();
        this.repository = repository;
    }

    public async execute(input: I): Promise<O> {
        const doc = await this.repository.findById(<number>input.id)

        if(!doc) {
            throw this.errorFactory.unauthorizedError(`This id isn't existed.`)
        }

        const output = <O>{
            data: {
                message: `Find successfully`,
                entity: doc
            }
        }

        return output.data;
    }
}