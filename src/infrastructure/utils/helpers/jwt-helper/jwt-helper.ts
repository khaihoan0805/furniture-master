import * as jwt from 'jsonwebtoken';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';

import {singletonProvide} from "../../../ioc";
import {TYPES} from "../../../../const";

export interface IJwtHelper {
  signin(payload: any, options?: SignOptions): string;
  verify(token: string, options?: VerifyOptions): any;
}

@singletonProvide(TYPES.JWT_HELPER)
export class JwtHelper implements IJwtHelper {
  private readonly SECRET = 'theGentleman2020';

  signin(payload: any, options?: SignOptions): string {
    const opt = Object.assign({}, options, { expiresIn: '6h' });
    return jwt.sign(payload, this.SECRET, opt);
  }

  verify(token: string, options?: VerifyOptions): any {
    const opt = Object.assign({}, options);
    return jwt.verify(token, this.SECRET, opt);
  }
}
