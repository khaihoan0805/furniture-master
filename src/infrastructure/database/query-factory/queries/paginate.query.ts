import { DatabaseModel, PaginateResult } from "../../index";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { Context } from "../../../service";
import { lazyInject } from "../../../ioc";
import { TYPES } from "../../../../const";

export class PaginateQuery {
  private model: DatabaseModel;

  @lazyInject(TYPES.HTTP_CONTEXT)
  private ctx: Context;

  constructor(model: DatabaseModel) {
      this.model = model;
  }

  public async execute<TEntity = any>(criteria: Criteria): Promise<PaginateResult<TEntity>> {
    const query = QueryParser.parse(criteria);

    if (!query) { throw Error('missing query'); }

    // OwnerFilter.append(this.ctx, this.model.name, query);

    return this.model.paginate(query);
  }
}
