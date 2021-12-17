import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";
import { Criteria } from "../../../repository";
import { Context } from "../../../service/context-service/context-entity";
import { DatabaseModel } from "../../index";
import { QueryParser } from "../../query-parser/query-parser";

export class CountQuery {
    private model: DatabaseModel;
    
    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel) {
        this.model = model;
    }

    public async execute(criteria: Criteria): Promise<number> {
        if (!criteria) { throw Error('missing criteria'); }

        const query = QueryParser.parse(criteria);

        //   OwnerFilter.append(this.ctx, this.model.name, query);

        return this.model.count(query.options)
    }
}