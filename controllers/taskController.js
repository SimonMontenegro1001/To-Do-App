import picocolors from "picocolors";
import { formatTask, infoMessage, readChecklist, readUserInput } from "../helpers/messageHelper.js";

export async function handleMenuOption(tasks, option) {
    switch (option) {
        case "1":
            await createTask(tasks);
            break;
        case "2":
            await listTasks(tasks);
            break;
        case "3":
            await deleteTasks(tasks);
            break;
        case "4":
            await toggleTasks(tasks);
            break;
        case "5":
            await listCompletedTasks(tasks);
            break;
        case "6":
            await listIncompleteTasks(tasks);
            break;
        case "0":
            exit();
            break;
        default:
            break;
    }
}

async function createTask(tasks) {
    const { response } = await readUserInput("Descripción: ");
    tasks.addTask(response.trim());
    console.log(infoMessage("Tarea creada"));
}

async function listTasks(tasks) {
    const taskList = tasks.getTasks();
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O");
    } else {
        taskList.forEach((task, index) => {
            const taskData = formatTask(task).split("::");
            console.log(index + 1, taskData[0] + "::" + taskData[1]);
        });
    }
}

async function deleteTasks(tasks) {
    const taskList = tasks.getTasks();
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O");
        return;
    }

    const allDescriptions = taskList.map(task => {
        const { description, id } = task;
        return {
            name: description,
            value: id
        };
    });

    const { response } = await readChecklist("Selecciona las tareas a eliminar: ", allDescriptions);
    if (response.length > 0) {
        taskList.forEach(task => {
            if (response.includes(task.id)) {
                tasks.deleteTask(task.id);
            }
        });
    }
    console.log(infoMessage(response.length, "Tareas Borradas"));
}

async function toggleTasks(tasks) {
    const taskList = tasks.getTasks()

    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O")
        return
    }

    const allDescriptions = taskList.map(task => {
        const { description, isCompleted, id } = task
        return {
            name: description,
            value: id,
            checked: isCompleted
        }
    })
    const a = allDescriptions.map(p => {
        return { value: p.value, cambiarOriginal: p.checked }
    })
    const { response } = await readChecklist("Selecciona las tareas a completar: ", allDescriptions)

    const responseRes = [];
    allDescriptions.forEach(task => {
        const p = { value: task.value, cambiar: response.includes(task.value) }
        responseRes.push(p)
    });
    a.forEach((t, i) => {
        if (t.cambiarOriginal !== responseRes[i].cambiar) {
            tasks.toggleTask(t.value)
        }
    })
    console.log(infoMessage("Tareas editadas"))

}

function exit() {
    console.log(infoMessage("Hasta luego", "(❁´◡`❁)"));
}

async function listCompletedTasks(tasks) {
    const taskList = tasks.getTasks();
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O");
    } else {
        let i = 0;
        let tasksToDisplay = "";
        taskList.forEach(task => {
            if (task.isCompleted) {
                const taskData = formatTask(task).split("::");
                tasksToDisplay += `${picocolors.yellow(i + 1)} ${taskData[0]} :: ${taskData[2]}\n`;
                i++;
            }
        });
        if (tasksToDisplay === "") console.log("\n\tNo hay tareas completadas O.O");
        else console.log(tasksToDisplay);
    }
}

async function listIncompleteTasks(tasks) {
    const taskList = tasks.getTasks();
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O");
    } else {
        let i = 0;
        let tasksToDisplay = "";
        taskList.forEach(task => {
            if (!task.isCompleted) {
                const taskData = formatTask(task).split("::");
                tasksToDisplay += `${picocolors.yellow(i + 1)} ${taskData[0]} :: ${taskData[2]}\n`;
                i++;
            }
        });

        if (tasksToDisplay === "") console.log("\n\tNo hay tareas incompletas O.O");
        else console.log(tasksToDisplay);
    }
}
