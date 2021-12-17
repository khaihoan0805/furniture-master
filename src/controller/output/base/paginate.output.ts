import { BaseHttpOutput, IBaseHttpOutput, IDomain } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface IPaginateOutput<Entity extends IDomain> extends IBaseHttpOutput {
    message: string;
    entities: Entity[];
}

@injectable()
export class PaginateOutput<Entity extends IDomain> extends BaseHttpOutput<IPaginateOutput<Entity>> implements IPaginateOutput<Entity> {
    constructor(output: IPaginateOutput<Entity>) {
        super(output)
    }

    get message() {
        return this.output.message;
    }

    get entities() {
        return this.output.entities;
    }
} 