import { Model } from "sequelize";
import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";


export class FindQuery {
    private model: DatabaseModel;
    
    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel) {
        this.model = model;
    }

    public async execute<TEntity = any>(criteria: Criteria): Promise<Model<TEntity>[]> {
        if (!criteria) { throw Error('missing criteria'); }

        const query = QueryParser.parse(criteria);

        // OwnerFilter.append(this.ctx, this.model.name, query);

        return this.model.findAll(query.options);
    }
}
