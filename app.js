import { menu, wait } from './helpers/mensajesHelper.js'
import { handleMenuOption } from './utils/handleMenuOption.js';
import { Tareas } from './models/tareas.js'

const tasks = new Tareas()

do {
    const { option } = await menu()
    if (option == 0) break;
    await handleMenuOption(tasks, option)
    await wait()
} while (true);




