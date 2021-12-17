import { fluentProvide } from 'inversify-binding-decorators'

export const singletonNamedProvide = (identifier: symbol, name: symbol) => 
    fluentProvide(identifier)
        .inSingletonScope()
        .whenTargetNamed(name.toString())
        .done()