import {TaskDto} from "../dto/TaskDto.ts";

const API_BASE_URL = 'http://localhost:8080/tasks';

export async function getAllTasks(email: string) {
    return await (await fetch(`${API_BASE_URL}?email=${email}`)).json();
}

export async function saveTask(task: TaskDto) {
    return await (await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(task)
    })).json() as TaskDto
}
