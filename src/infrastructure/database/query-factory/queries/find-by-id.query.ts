import { DatabaseModel } from "../../index";
import { Criteria, Operators } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { Context } from "../../../service";
import { Model } from "sequelize";
import { lazyInject } from "../../../ioc";
import { TYPES } from "../../../../const";


export class FindByIdQuery {
  private model: DatabaseModel;

  @lazyInject(TYPES.HTTP_CONTEXT)
  private ctx: Context;

  constructor(model: DatabaseModel) {
    this.model = model;
  }

  public async execute<TEntity = any>(id: number, criteria?: Criteria): Promise<Model<TEntity>> {
    if (!id) { throw Error('missing id'); }

    const args: Criteria = { filters: [{ code: 'id', operator: Operators.Equals, value: id }] };

    if (criteria) {
      if (criteria.select) { args.select = criteria.select; }
      if (criteria.includes) { args.includes = criteria.includes; }
    }

    if (this.ctx.transaction) { args.transaction = this.ctx.transaction }

    const query = QueryParser.parse(args);

    // OwnerFilter.append(this.ctx, this.model.name, query);

    return this.model.findOne(query.options);
  }
}
