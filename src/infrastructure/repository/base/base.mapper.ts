import { TYPES } from "../../../const";
import { IEntityFactory } from "../../../domain";
import { IDomain } from "../../base/domain";
import { inject, injectable } from '../../ioc';
import { IObjectHelper } from "../../utils";

export interface IDataMapper<D> {
    toEntity(data: any, select?: string[]): D;
    toDatabase(entity: D, select?: string[]): any;
}

@injectable()
export abstract class BaseDatabMapper<D extends IDomain> implements IDataMapper<D> {
    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.OBJECT_HELPER)
    protected objectHelper: IObjectHelper;

    protected abstract entityType: symbol;
    protected abstract toEntityFields: string[];
    protected abstract toDatabaseFields: string[];

    public toEntity(data: any, select?: string[]): D {
        let field = this.toEntityFields

        if (select) { field = select }

        const params = this.objectHelper.pick(data, field)

        return <D>this.entityFactory.create(this.entityType.toString(), data)
    }

    public toDatabase(entity: D, select?: string[]): any {
        let fields = this.toDatabaseFields

        if (select) { fields = select }

        const params = this.objectHelper.pick(entity, fields)

        console.log(params)

        return this.objectHelper.omitByUndefined(params)
    }
}