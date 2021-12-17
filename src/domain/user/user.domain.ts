import { IUserDomain } from "./index";
import { BaseDomain } from "../../infrastructure/base/domain";
import { API_DOMAIN } from "../../const/domain";

export class UserDomain extends BaseDomain<IUserDomain> implements IUserDomain{
    get id() {
        return this.context.id;
    }

    get firstName() {
        return this.context.firstName;
    }

    get lastName() {
        return this.context.lastName;
    }

    get email() {
        return this.context.email;
    }

    get password() {
        return this.context.password;
    }

    get isSuperAdmin() {
        return this.context.isSuperAdmin;
    }

    get status() {
        return this.context.status;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get createdBy() {
        return this.context.createdBy;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    get updatedBy() {
        return this.context.updatedBy;
    }

    protected nameContext = API_DOMAIN.USER;

    
  json(): IUserDomain {
    const {
      id,
      firstName,
      lastName,
      email,
      isSuperAdmin,
    //   accounts,
      status,
      password,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    } = this;
    return {
      id,
      firstName,
      lastName,
      email,
      isSuperAdmin,
    //   accounts,
      status,
      password,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    };
  }

    toString() {
        return JSON.stringify(this.json());
    }
} 