import { BaseHttpOutput, IBaseHttpOutput, IDomain } from '../../../infrastructure/base';
import { injectable } from '../../../infrastructure/ioc';

export interface IUpdateOutput<D extends IDomain> extends IBaseHttpOutput {
    message: string;
    entity: D;
}

@injectable()
export class UpdateOutput<Entity extends IDomain> extends BaseHttpOutput<IUpdateOutput<Entity>> implements IUpdateOutput<Entity> {
    constructor(output: IUpdateOutput<Entity>) {
        super(output)
    }

    get message() {
        return this.output.message;
    }

    get entity() {
        return this.output.entity;
    }
}