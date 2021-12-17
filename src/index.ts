export {
    BaseApplication,
    IApplication
} from './infrastructure/base/application';
import {
    buildProviderModule,
    container
} from './infrastructure/ioc';

import './const';
import './infrastructure';
import './application';
import './controller';
import './usecase';
import './domain';

container.load(buildProviderModule())

export { container }