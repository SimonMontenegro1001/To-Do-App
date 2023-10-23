import { v4 as uuidv4 } from 'uuid';

export class Task {
    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.isCompleted = false;
        this.creationDate = new Date();
        this.completionDate = null;
    }
}
