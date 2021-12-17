import { BaseHttpOutput, IBaseHttpOutput, IDomain } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface IFindByIdOutput<Entity extends IDomain> extends IBaseHttpOutput {
    message: string;
    entity: Entity
}

@injectable()
export class FindByIdOutput<Entity extends IDomain> extends BaseHttpOutput<IFindByIdOutput<Entity>> implements IFindByIdOutput<Entity> {
    constructor(output: IFindByIdOutput<Entity>) {
        super(output)
    }

    get message() {
        return this.output.message;
    }

    get entity() {
        return this.output.entity;
    }
}