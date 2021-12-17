import { BaseUsecase, IDomain } from "../../../infrastructure/base";
import { IRepository } from "../../../infrastructure/repository/base";
import { inject, injectable, interfaces } from '../../../infrastructure/ioc';
import { TYPES } from "../../../const";
import { IEntityFactory } from "../../../domain";
import { IErrorFactory } from "../../../infrastructure";
import { ICreateInput } from "../../../controller/input/base/create.input";
import { ICreateOutput } from "../../../controller/output/base";

export interface ICreateUsecase<D extends IDomain,I extends ICreateInput, O extends ICreateOutput<D>> {
    execute(input: I): Promise<O>
}

@injectable()
export abstract class CreateUsecase<D extends IDomain , I extends ICreateInput, O extends ICreateOutput<D>> extends BaseUsecase<I, O> {
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

    abstract validate(entity: D): Promise<void>;

    // abstract plugInStep(output?: any): Promise<any>;

    async execute(input: I): Promise<O> {
        const entity = <D>this.entityFactory.create(this.DOMAIN.toString(), input)
        await this.validate(entity)
        
        this.log.info(entity)

        const doc = await this.repository.create(entity)

        const output = <O>{
            data: {
                message: `Create successfully`,
                entity: doc
            }
        } 
        
        return output.data;
    }
}