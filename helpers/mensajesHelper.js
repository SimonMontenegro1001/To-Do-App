
import inquirer from 'inquirer'
import picocolors from 'picocolors'

const choices = [
    {
        name: "1. Crear tarea",
        value: "1"
    },
    {
        name: "2. Listar tareas",
        value: "2"
    },
    {
        name: "3. Eliminar tarea(s)",
        value: "3"
    },
    {
        name: "4. Marcar tarea(s)",
        value: "4"
    },
    {
        name: "5. Listar tareas completadas",
        value: "5"
    },
    {
        name: "6. Listar tareas incompletas",
        value: "6"
    },
    {
        name: "0. Salir",
        value: "0"
    }
]

export async function menu() {
    console.clear()
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: '¿Que queres hacer?',
            choices
        },
    ])
}

export async function wait() {
    console.log("\n")
    return await inquirer.prompt({
        type: 'input',
        name: 'enter',
        message: `Precione ${picocolors.green("ENTER")} para continuar`,
    })
}

export async function readInput(message) {
    return await inquirer.prompt({
        type: 'input',
        message,
        name: 'response',
        validate: input => {
            if (input.trim() !== '') return true
            console.log(errorMessage("Mensaje Invalido"))
        }
    })
}

export async function readChecklist(message, choices) {
    return await inquirer.prompt({
        type: 'checkbox',
        message,
        name: 'response',
        choices
    });
}

export function formatterTask(task) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    let formattedTask = ""
    if (task.isCompleted) {

        const { completionDate } = task
        const formatedDate = completionDate.toLocaleDateString('es-ES', options)
        formattedTask = `${task.description} :: ${picocolors.green("completada")} :: Se completo el ${picocolors.white(formatedDate)}`
    } else {
        const { creationDate } = task
        const formatedDate = creationDate.toLocaleDateString('es-ES', options)

        formattedTask = `${task.description} :: ${picocolors.red("incompleta")}  :: Se creo el ${picocolors.white(formatedDate)}`;
    }

    return formattedTask
}

export function informationMessage(...args) {
    const messages = args.join(' ')
    return `${picocolors.yellow("* ")}${picocolors.yellow(messages)}`
}

export function errorMessage(...args) {
    const message = args.join(' ')
    return `❌ ${picocolors.red(message)}`
}