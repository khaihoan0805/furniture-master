import { interfaces, injectable, decorate } from 'inversify'

import { container } from '../container'

export function constructorProvide(serviceIdentifier: symbol | interfaces.Newable<any>) {
    return function (target: any) {
        decorate(injectable(), target);
        container
            .bind<interfaces.Newable<any>>(serviceIdentifier)
            .toConstructor(target);

        return target
    }
}