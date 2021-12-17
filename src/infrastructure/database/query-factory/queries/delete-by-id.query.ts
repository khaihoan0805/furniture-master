import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";

export class DeleteByIdQuery {
  private model: DatabaseModel;
  
  @lazyInject(TYPES.HTTP_CONTEXT)
  private ctx: Context;

  constructor(model: DatabaseModel) {
    this.model = model;
  }

  public async execute(id: number): Promise<void> {
    if (!id) { throw Error('missing id'); }

    const criteria: Criteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    const query = QueryParser.parse(criteria);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    const doc = await this.model.findOne(query.options);

    if (!doc) { throw Error('NotFoundError'); }

    return await doc.destroy({ transaction: this.ctx.transaction });
  }
}
