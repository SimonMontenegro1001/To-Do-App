import picocolors from "picocolors";
import { formatterTask, informationMessage, readChecklist, readInput } from "../helpers/mensajesHelper.js";
import { validate } from "uuid";

export async function handleMenuOption(tasks, option) {
    switch (option) {
        case "1":
            await CrearTarea(tasks)
            break;
        case "2":
            await obtenerTareas(tasks)
            break;
        case "3":
            await borrarTareas(tasks)
            break;
        case "4":
            await cambiarEstado(tasks)
            break;
        case "5":
            await obtenerTareasCompletadas(tasks)
            break;
        case "6":
            await obtenerTareasIncompletas(tasks)
            break;
        case "0":
            salir()
            break;
        default:
            break;
    }
}

async function CrearTarea(tasks) {
    const { response } = await readInput("Descripción: ")
    tasks.addTask(response.trim())
    console.log(informationMessage("Tarea creada"))
}

async function obtenerTareas(tasks) {
    const taskList = tasks.getTasks()
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O")
    }
    else {
        taskList.forEach((task, index) => {
            const taskData = formatterTask(task).split("::")
            console.log(index + 1, taskData[0] + "::" + taskData[1])
        });
    }
}

async function borrarTareas(tasks) {
    const taskList = tasks.getTasks()

    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O")
        return
    }

    const allDescriptions = taskList.map(task => {
        const { description, id } = task
        return {
            name: description,
            value: id
        }
    })

    const { response } = (await readChecklist("Selecciona las tareas a eliminar: ", allDescriptions))
    if (response.length > 0) {
        taskList.forEach(task => {
            if (response.includes(task.id)) {
                tasks.deleteTask(task.id)
            }
        })
    }
    console.log(informationMessage(response.length, "Tareas Borradas"))
}

async function cambiarEstado(tasks) {
    // refactorizar urgente xd
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
            checked: isCompleted ? true : false
        }
    })
    const a = allDescriptions.map(p => {
        return { value: p.value, cambiarOriginal: p.checked }
    })
    const { response } = (await readChecklist("Selecciona las tareas a completar: ", allDescriptions))

    const responseRes = [];
    allDescriptions.forEach(task => {
        const p = { value: task.value, cambiar: response.includes(task.value) }
        responseRes.push(p)
    });

    a.forEach((t, i) => {
        if (t.cambiarOriginal !== responseRes[i].cambiar) {
            const esta = taskList.find(a => a.id === t.value)
            esta.toggleStatus()
        }
    })
    console.log(informationMessage("Tareas editadas"))
}

function salir() {
    console.log(informationMessage("Hasta luego", "(❁´◡`❁)"))
}

async function obtenerTareasCompletadas(tasks) {
    const taskList = tasks.getTasks()
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O")
    }
    else {
        let i = 0
        let tareasAMostrar = ""
        taskList.forEach(task => {

            if (task.isCompleted) {
                const taskData = formatterTask(task).split("::")
                tareasAMostrar += `${picocolors.yellow(i + 1)} ${taskData[0]} :: ${taskData[2]}\n`
                i++
            }
        });
        if (tareasAMostrar === "") console.log("\n\tNo hay tareas O.O")
        else console.log(tareasAMostrar)
    }
}

async function obtenerTareasIncompletas(tasks) {
    const taskList = tasks.getTasks()
    if (taskList.length === 0) {
        console.log("\n\tNo hay tareas O.O")
    }
    else {
        let i = 0
        let tareasAMostrar = ""
        taskList.forEach(task => {

            if (!task.isCompleted) {
                const taskData = formatterTask(task).split("::")
                tareasAMostrar += `${picocolors.yellow(i + 1)} ${taskData[0]} :: ${taskData[2]}\n`
                i++
            }
        });
        if (tareasAMostrar === "") console.log("\n\tNo hay tareas O.O")
        else console.log(tareasAMostrar)
    }
}