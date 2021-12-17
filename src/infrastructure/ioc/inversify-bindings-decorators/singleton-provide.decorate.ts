import { fluentProvide } from 'inversify-binding-decorators'

export const singletonProvide = (identifier: string | symbol) => fluentProvide(identifier).inSingletonScope().done()
