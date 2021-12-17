import { BaseHttpOutput, IBaseHttpOutput, IDomain } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface ICreateOutput<Entity extends IDomain> extends IBaseHttpOutput {
    message: string;
    entity: Entity;
}  

@injectable()
export class CreateOutput<Entity extends IDomain> extends BaseHttpOutput<ICreateOutput<Entity>> implements ICreateOutput<Entity> {
    constructor(output: ICreateOutput<Entity>) {
        super(output)
    }

    get message() {
        return this.output.message;
    }

    get entity() {
        return this.output.entity;
    }
}