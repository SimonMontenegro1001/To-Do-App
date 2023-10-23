import { readFileSync, writeFileSync, existsSync } from "node:fs";

export function saveToJsonFile(filePath, data) {
    try {
        const jsonContent = JSON.stringify(data, null, 2);
        writeFileSync(filePath, jsonContent, 'utf-8');
        return true;
    } catch (error) {
        if (!existsSync(filePath)) {
            writeFileSync(filePath, '[]', 'utf-8');
            return true;
        }
        console.error(error);
        return false;
    }
}

export function readJsonFile(filePath) {
    try {
        const data = readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (!existsSync(filePath)) {
            saveToJsonFile(filePath, []);
            return [];
        }
        console.error(error);
        return null;
    }
}
