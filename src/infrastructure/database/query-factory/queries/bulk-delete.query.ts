import { WhereOptions } from "sequelize";
import { DatabaseModel } from "../../index";
import { Criteria } from "../../../repository";
import { QueryParser } from "../../query-parser";
import { lazyInject } from "../../../ioc";
import { TYPES } from "../../../../const";
import { Context } from "../../../service";

export class BulkDeleteQuery {
    private model: DatabaseModel;
    
    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;
  
    constructor(model: DatabaseModel) {
      this.model = model;
    }
  
    public async execute(criteria: Criteria): Promise<number> {
      const query = QueryParser.parse(criteria);
  
      return this.model.destroy({
        where: query.options.where as WhereOptions<any>,
        transaction: this.ctx.transaction,
      });
    }
  }
  