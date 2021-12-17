import { inject } from "../../ioc";
import { FindOptions } from "sequelize";

import { IObjectHelper } from "../../utils";
import { TYPES } from "../../../const";

export class Query {
    public options: FindOptions;

    @inject(TYPES.OBJECT_HELPER)
    private objectHelper: IObjectHelper | undefined;

    constructor(options?: FindOptions) {
        this.options = options || { where: {} };
    }

    addCondition(condition: any): void {
        if (!this.options.where) this.options.where = {};

        this.objectHelper?.extend(this.options.where, condition);
    }

    appendAnd(key: string, value: any): void {
        if (!this.options.where) this.options.where = {};
        if (this.options?.where.hasOwnProperty(key)) {
            this.options.where = { $and: [this.options.where, value] };
        } else {
            this.objectHelper?.extend(this.options.where, value);
        }
    }

    appendOr(key: string, value: any): void {
        if (!this.options.where) this.options.where = {};

        if ((this.options?.where as any)[key]) {
            let oldVal = this.objectHelper?.clone((this.options?.where as any)[key]);
            delete (this.options?.where as any)[key];
            this.objectHelper?.extend(this.options.where, {
                $or: [this.objectHelper?.set({}, key, oldVal), value]
            });
        } else {
            this.objectHelper?.extend(this.options.where, value);
        }
    }
}