import { Model } from "sequelize/types";
import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { IArrayHelper } from "../../../index";
import { container } from '../../../../index';
import { lazyInject } from "../../../ioc";
import { Context } from "../../../service";

export class BulkCreateQuery {
    private model: DatabaseModel;
    private arrayHelper: IArrayHelper;

    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel) {
      this.model = model;
  
      this.arrayHelper = container.get<IArrayHelper>(TYPES.ARRAY_HELPER);
    }
  
    public async execute<TEntity = any>(data: (TEntity & { createdBy?: number })[]): Promise<Model<TEntity>[]> {
      if (!data || this.arrayHelper.isEmpty(data)) {
        throw Error('missing data');
      }
  
      data = data.map((datum) => {
        // append created by
        if (this.ctx.user && this.ctx.user.id) {
          datum.createdBy = this.ctx.user.id;
        }
  
        return datum;
      });
  
      return this.model.bulkCreate(data, {
          transaction: this.ctx.transaction
      })
    }
  }
  