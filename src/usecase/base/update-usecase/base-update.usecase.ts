import { TYPES } from "../../../const";
import { IEntityFactory } from "../../../domain";
import { IErrorFactory, Operators } from "../../../infrastructure";
import { BaseUsecase, IBaseHttpInput, IBaseHttpOutput, IBaseUsecase, IDomain } from "../../../infrastructure/base";
import { inject, injectable, singletonNamedProvide } from '../../../infrastructure/ioc';
import { IRepository } from "../../../infrastructure/repository/base";

export interface IUpdateUsecase<D extends IDomain, I extends IBaseHttpInput & { id: number }, O extends IBaseHttpOutput> extends IBaseUsecase<I, O> { }

@injectable()
export abstract class UpdateUsecase<D extends IDomain, I extends IBaseHttpInput & { id: number }, O extends IBaseHttpOutput> extends BaseUsecase<I, O>{
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

    public async validate(id: number): Promise<void> {
        const isExisted = await this.repository.findById(id);

        if (!isExisted) {
            console.log(`pass here`)
            throw this.errorFactory.unauthorizedError(`this ${Symbol.keyFor(this.DOMAIN).toLowerCase()} id: ${id} is not existed.`)
        }
    }

    public async execute(input: I): Promise<O> {
        await this.validate(input.id)

        const entity = <D>this.entityFactory.create(this.DOMAIN.toString(), input)

        const doc = await this.repository.update(entity, {
            filters: [
                { code: 'id', operator: Operators.Equals, value: entity.id }
            ]
        })

        const output = <O>{
            data: {
                message: `Update successfully`,
                entity: doc
            }
        }

        return output.data;
    }
}