import { USER_OUTPUT } from "../../../const";
import { IUserDomain, UserDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { ICreateUserInput } from "../../input/user/create-user.input";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateUserOutput extends ICreateOutput<IUserDomain> {
}

@constructorProvide(USER_OUTPUT.CREATE)
export class CreateUserOutput extends CreateOutput<IUserDomain> implements ICreateUserOutput {
    constructor(output: ICreateUserOutput) {
        super(output)
    }

    get response() {
        const {
            message,
            entity
        } = this;
        
        return {
            message,
            entity
        }
    }
}