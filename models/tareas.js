import { Tarea } from "./Tarea.js";

export class Tareas {
    #taskList;

    constructor() {
        this.#taskList = [];
    }

    addTask(description) {
        const newTask = new Tarea(description);
        this.#taskList.push(newTask);
        return newTask;
    }

    getTasks() {
        return this.#taskList;
    }

    deleteTask(id) {
        this.#taskList = this.#taskList.filter(task => task.id !== id);
    }

}
