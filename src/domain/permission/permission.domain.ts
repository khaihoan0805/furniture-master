import { IPermissionDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.PERMISSION)
export class PermissionDomain extends BaseDomain<IPermissionDomain> implements IPermissionDomain {
    get id() {
        return this.context.id;
    }

    get name() {
        return this.context.name;
    }

    get role() {
        return this.context.role;
    }

    get accountTypes() {
        return this.context.accountTypes;
    }

    protected nameContext = API_DOMAIN.PERMISSION;

    json() {
        const {
            id, 
            name,
            role,
            accountTypes
        } = this;

        return {
            id,
            name,
            role,
            accountTypes
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}