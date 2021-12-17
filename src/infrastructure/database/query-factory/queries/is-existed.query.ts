import { DatabaseModel } from "../../index";
import { IArrayHelper } from "../../../utils";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { Context } from "../../../service";
import { container } from '../../../../index';
import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";


export class IsExistQuery {
    private model: DatabaseModel;
    private arrayHelper: IArrayHelper;

    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel) {
        this.model = model;
    
        this.arrayHelper = container.get(TYPES.ARRAY_HELPER);
    }

    public async execute(criteria: Criteria): Promise<boolean> {
        if (!criteria) { throw Error('missing criteria'); }

        const query = QueryParser.parse(criteria);

        // OwnerFilter.append(this.ctx, this.model.name, query);

        const result = await this.model.findAll(query.options);

        return this.arrayHelper.isEmpty(result);
    }
}
