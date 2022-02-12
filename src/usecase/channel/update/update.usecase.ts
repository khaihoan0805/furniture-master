import { TYPES } from "../../../const";
import { IUpdateChannelInput, IUpdateChannelOutput } from "../../../controller";
import { IChannelDomain } from "../../../domain";
import { singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase } from "../../base";

export interface IUpdateChannelUsecase extends IUpdateUsecase<IChannelDomain, IUpdateChannelInput, IUpdateChannelOutput> { }

@singletonNamedProvide(TYPES.USECASE, NAMES)