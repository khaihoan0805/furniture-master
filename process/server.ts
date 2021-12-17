import {
    NAMES,
    TYPES
} from '../src/const'

import { IApplication, container } from '../src'

const server = container.getNamed<IApplication>(TYPES.APPLICATION, NAMES.API.toString())

new Promise(async () => {
    await server.load();
    await server.start();
})