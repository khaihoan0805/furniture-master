import { Container } from './inversify'
import getDecorators from 'inversify-inject-decorators'
import { TYPES } from '../../const';

const container = new Container();

const { lazyInject } = getDecorators(container, false);

container.bind<number>(TYPES.HTTP_CONTEXT).toConstantValue(1);

export { container, lazyInject }