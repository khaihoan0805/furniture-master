import config from 'config'

import { TYPES } from '../../../const'
import { singletonProvide } from '../../ioc'

export interface IConfiguration {
    get(setting: string): any;
    has(setting: string): boolean;
}

@singletonProvide(TYPES.CONFIG)
export class Configuration implements IConfiguration {
    private config: config.IConfig;

    constructor() {
        this.config = config;
    }

    public get(setting: string) {
        try {
            return this.config.get(setting);
        }
        catch (error) { return; }
    }

    public has(setting: string): boolean {
        return this.config.has(setting)
    }
}