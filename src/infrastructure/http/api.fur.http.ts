import { Http } from './http'

import { singletonProvide } from '../ioc'
import { TYPES } from '../../const'

@singletonProvide(TYPES.HTTP)
export class ApiFurHttp extends Http {
    constructor() {
        super()
    }
}