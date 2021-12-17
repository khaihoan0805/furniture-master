import { Request } from "express";
import { Transaction } from "sequelize";
import { DATABASE, TYPES } from "../../../const";
import { UserDomain } from "../../../domain";
import { inject, namedInject } from "../../ioc";
import { IUserRepository } from '../../repository';
import { IObjectHelper } from "../../utils";


/*export interface IRequestContext {
  params: any;
  body: any;
  query: any;
  headers: any;
  protocol: string;
}*/

/*export interface IAccountContext {
  id: number;
  name: string;
  type: number;
  permissions: string[];
  adminId: number;
  companyId: number;
  brandId: number;
}*/

/*export interface IUserContext extends UserDomain {
  token: string;
  isSuperAdmin: boolean;
  account: IAccountContext;
  originalAccount: IAccountContext;
  permissions: any[];
}*/

export class Context {
/*  public req: Request;*/
  public user: UserDomain;
  public transaction: Transaction;
  public timestamp: number;
  public protocol: string;
  public originalUrl: string;
/*  public token: string;*/

  @inject(TYPES.OBJECT_HELPER)
  private objectHelper: IObjectHelper;

  @namedInject(TYPES.REPOSITORY, DATABASE.USER)
  private userRepository: IUserRepository;

  constructor(req: Request, transaction: any) {

    this.transaction = transaction;
    this.timestamp = Date.now();
    this.protocol = req.protocol;
    this.originalUrl = req.originalUrl;

  }
}
