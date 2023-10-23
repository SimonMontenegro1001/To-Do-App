import { showMenu, waitForEnter } from './helpers/messageHelper.js';
import { handleMenuOption } from './controllers/taskController.js';
import { TaskManager } from './models/TaskManager.js';

const tasks = new TaskManager();

async function main() {
    do {
        const { option } = await showMenu();
        await handleMenuOption(tasks, option);
        if (option == 0) break;
        await waitForEnter();
    } while (true);
}

main();
