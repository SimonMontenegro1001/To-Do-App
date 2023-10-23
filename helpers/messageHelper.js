import inquirer from 'inquirer'
import picocolors from 'picocolors'

const menuOptions = [
    { value: '1', name: '1. Crear tarea' },
    { value: '2', name: '2. Listar tareas' },
    { value: '3', name: '3. Eliminar tarea(s)' },
    { value: '4', name: '4. Marcar tarea(s)' },
    { value: '5', name: '5. Listar tareas completadas' },
    { value: '6', name: '6. Listar tareas incompletas' },
    { value: '0', name: '0. Salir' },
]

export async function showMenu() {
    console.clear()
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: '¿Qué acción deseas realizar?',
            choices: menuOptions,
        },
    ])
}

export async function waitForEnter() {
    console.log('\n')
    return await inquirer.prompt({
        type: 'input',
        name: 'enter',
        message: `Presiona ${picocolors.green('ENTER')} para continuar`,
    })
}

export async function readUserInput(message) {
    return await inquirer.prompt({
        type: 'input',
        message,
        name: 'response',
        validate: (input) => {
            if (input.trim() !== '') return true
            console.log(errorMessage('Mensaje Inválido'))
        },
    })
}

export async function readChecklist(message, checklistChoices) {
    return await inquirer.prompt({
        type: 'checkbox',
        message,
        name: 'response',
        choices: checklistChoices,
    })
}

export function formatTask(task) {
    const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }

    const getFormattedDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', dateOptions)
    }

    if (task.isCompleted) {
        const completionDate = getFormattedDate(task.completionDate)
        return `${task.description} :: ${picocolors.green('completada')} :: Completada el ${picocolors.white(completionDate)}`
    } else {
        const creationDate = getFormattedDate(task.creationDate)
        return `${task.description} :: ${picocolors.red('incompleta')} :: Creada el ${picocolors.white(creationDate)}`
    }
}

export function infoMessage(...args) {
    const messages = args.join(' ')
    return `${picocolors.yellow('* ')}${picocolors.yellow(messages)}`
}

export function errorMessage(...args) {
    const message = args.join(' ')
    return `❌ ${picocolors.red(message)}`
}
