import { API_DOMAIN, AUTH_USECASE, TYPES } from "../../../const";
import { ISignInInput } from "../../../controller";
import { ISignInOutput } from "../../../controller/output/auth";
import { IErrorFactory, IJwtHelper, IPasswordHelper, IUserRepository } from "../../../infrastructure";
import { BaseUsecase, IBaseUsecase } from "../../../infrastructure/base";
import { inject, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";

export interface ISignInUsecase extends IBaseUsecase<ISignInInput, ISignInOutput> { }

@singletonNamedProvide(TYPES.USECASE, AUTH_USECASE.SIGN_IN)
export class SignInUsecase extends BaseUsecase<ISignInInput, ISignInOutput> implements ISignInUsecase {
    get id() {
        return AUTH_USECASE.SIGN_IN;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.USER)
        protected userRepository: IUserRepository,

        @inject(TYPES.ERROR_FACTORY)
        protected errorFactory: IErrorFactory,

        @inject(TYPES.JWT_HELPER)
        protected jwtHelper: IJwtHelper,

        @inject(TYPES.PASSWORD_HELPER)
        protected passwordHelper: IPasswordHelper
    ) {
        super()
    }

    public async execute(input: ISignInInput): Promise<ISignInOutput> {
        const isExisted = await this.userRepository.findByEmail(input.email)

        if (!isExisted) {
            throw this.errorFactory.unauthorizedError(`This email ${input.email} is not existed`);
        }

        console.log(isExisted)

        const validPassword = this.passwordHelper.compare(input.password, isExisted.password);
        if (!validPassword) {
            throw this.errorFactory.unauthorizedError(`Invalid Password`);
        }

        const token = this.jwtHelper.signin(isExisted)

        return { message: `successfully`, token: token }
    }
}