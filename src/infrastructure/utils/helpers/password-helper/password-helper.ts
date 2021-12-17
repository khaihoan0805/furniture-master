import * as bcrypt from 'bcrypt';
import {singletonProvide} from "../../../ioc";
import {TYPES} from "../../../../const";

export interface IPasswordHelper {
  encrypt(password: string): string;
  compare(password: string, encodedPassword: string): boolean;
}


@singletonProvide(TYPES.PASSWORD_HELPER)
export class PasswordHelper implements IPasswordHelper {
  public encrypt(password: string): string {
    if (!password) {
      throw Error('missing password');
    }

    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
  }

  public compare(password: string, encodedPassword: string): boolean {
    if (!password) {
      throw Error('missing password');
    }
    if (!encodedPassword) {
      throw Error('missing encoded password');
    }

    return bcrypt.compareSync(password, encodedPassword);
  }
}
