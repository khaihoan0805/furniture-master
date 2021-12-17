import { Model } from "sequelize/types";
import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";
import { Criteria } from "../../../repository";
import { Context } from "../../../service";
import { QueryParser } from "../../query-parser";


export class UpdateByIdQuery {
  private model: DatabaseModel;
  
  @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel) {
        this.model = model;
    }

  public async execute<TEntity = any>(
    id: number,
    data: TEntity & { updatedAt?: Date; updatedBy?: number },
  ): Promise<Model<TEntity>> {
    if (!id) {
      throw Error('missing id');
    }
    if (!data) {
      throw Error('missing data');
    }

    const criteria: Criteria = { filters: [{ code: 'id', operator: 'is', value: [id] }] };

    const query = QueryParser.parse(criteria);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    data.updatedAt = new Date();

    if (this.ctx.user && this.ctx.user.id) {
      data.updatedBy = this.ctx.user.id;
    }

    const doc = await this.model.findOne(query.options);

    if (!doc) {
      throw Error('NotFoundError');
    }

    return doc.update(data, { 
      transaction: this.ctx.transaction
    });
  }
}
