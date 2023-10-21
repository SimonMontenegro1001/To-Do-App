import { v4 as uuidv4 } from 'uuid';
export class Tarea {
    id;
    description;
    isCompleted;
    creationDate;
    completionDate;

    constructor(description) {
        this.description = description;
        this.creationDate = new Date();
        this.isCompleted = false;
        this.id = uuidv4();
    }

    toggleStatus() {
        this.isCompleted = !this.isCompleted;
        if (this.isCompleted === true) this.completionDate = new Date();
    }
}