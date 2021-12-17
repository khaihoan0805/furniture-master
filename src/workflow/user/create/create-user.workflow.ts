import { API_DOMAIN, DATABASE, TYPES, USER_WORKFLOW } from "../../../const";
import { ICreateUserInput, ICreateUserOutput } from "../../../controller";
import { IUserDomain, UserDomain } from "../../../domain";
import { IUserRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateUserWorkflow extends ICreateWorkflow<IUserDomain, ICreateUserInput, ICreateUserOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, USER_WORKFLOW.CREATE)
export class CreateUserWorkflow extends CreateWorkflow<IUserDomain, ICreateUserInput, ICreateUserOutput> {
    get DOMAIN() {
        return API_DOMAIN.USER;
    }

    get id() {
        return USER_WORKFLOW.CREATE
    }
    

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.USER)
        protected repository: IUserRepository
    ) {
        super(repository)
    }

    async validate(entity: IUserDomain): Promise<void> {
        const isExistedUser = await this.repository.findByEmail(entity.email)

        if(isExistedUser) {
            throw this.errorFactory.unauthorizedError(`This email: ${entity.email} isn't existed.`)
        }
    }

    async execute(input: ICreateUserInput): Promise<ICreateUserOutput> {
        return await super.execute(input);
    }
}