import { IUserDomain, UserDomain } from "../../../domain";
import { BaseDatabMapper, IDataMapper } from "../base";
import { inject, singletonNamedProvide } from '../../ioc';
import { API_DOMAIN, TYPES } from "../../../const";
import { IPasswordHelper } from "../../utils";

export interface IUserMapper extends IDataMapper<IUserDomain> {}

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.USER)
export class UserMapper extends BaseDatabMapper<IUserDomain> implements IDataMapper<IUserDomain> {
    @inject(TYPES.PASSWORD_HELPER) protected passwordHelper: IPasswordHelper;

    protected entityType = API_DOMAIN.USER;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'isSuperAdmin',
            'status',
            'createdAt',
            'createdBy',
            'updatedAt',
            'updatedBy'
        ];

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'isSuperAdmin',
            'status',
            'createdAt',
            'createdBy',
            'updatedAt',
            'updatedBy'
        ];

        return toDatabaseFields;
    }

    toDatabase(entity: UserDomain, select?: string[]): any {
        let fields = this.toDatabaseFields;

        if(select) {
            fields = select
        }

        const params = this.objectHelper.pick(entity, fields)

        if(params.password) {
            params.password = this.passwordHelper.encrypt(params.password)
        }

        return this.objectHelper.omitByUndefined(params)
    }
}