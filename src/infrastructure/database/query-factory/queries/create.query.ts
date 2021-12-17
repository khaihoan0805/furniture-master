import { Model } from "sequelize";
import { DatabaseModel } from "../..";
import { TYPES } from "../../../../const";
import { lazyInject } from "../../../ioc";
import { Include } from "../../../repository";
import { Context } from "../../../service";

type CreateQueryOptions = {
    include? : Include;
}

export class CreateQuery{
    private model : DatabaseModel;
    
    @lazyInject(TYPES.HTTP_CONTEXT)
    private ctx: Context;

    constructor(model: DatabaseModel){
        this.model = model;
    }
    public async execute<TEntity = any>(data : TEntity & {createdBy?: number} , options? : CreateQueryOptions) : Promise<void | Model<TEntity>> {
        if(!data) throw Error("Missing data")

        if(this.ctx.user && this.ctx.user.id)
            data.createdBy = this.ctx.user.id;

        const opts: any = {
            transaction : this.ctx.transaction
        }

        if(options && options.include)
            opts.include = options.include;
           
        return this.model.create(data, opts);
    }
}