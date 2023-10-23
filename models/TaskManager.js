import { Task } from "./Task.js";
import { readJsonFile, saveToJsonFile } from "../helpers/fileHelper.js";

export class TaskManager {
    #taskList;
    filePath = "./tasks.json";

    constructor() {
        this.#taskList = readJsonFile(this.filePath) || [];
    }

    addTask(description) {
        const newTask = new Task(description);
        this.#taskList.push(newTask);
        saveToJsonFile(this.filePath, this.#taskList);
        return newTask;
    }

    getTasks() {
        return this.#taskList;
    }

    deleteTask(id) {
        this.#taskList = this.#taskList.filter((task) => task.id !== id);
        saveToJsonFile(this.filePath, this.#taskList);
    }

    toggleTask(id) {
        const task = this.#taskList.find((task) => task.id === id);
        if (task) {
            task.isCompleted = !task.isCompleted;
            task.completionDate = task.isCompleted ? new Date() : null;
            saveToJsonFile(this.filePath, this.#taskList);
            return true;
        }
        return false;
    }
}
