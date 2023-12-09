import {TaskDto} from "../dto/TaskDto.ts";

const API_BASE_URL = 'http://localhost:8080/todos';

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

export async function updateTask(task: TaskDto, value:string, status:boolean | null, color:string) {
    console.log('updated task: ',task, value, status, color)
    const response = await fetch(`${API_BASE_URL}/${task.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: value,
            status: status,
            color: color,
            email: task.email
        })
    });
    if (!response.ok) throw new Error("Failed to update the task");
}

export async function deleteTask(taskId: number, email: string) {
    const response = await fetch(`${API_BASE_URL}/${taskId}?email=${email}`, {method: 'DELETE'});
    if (!response.ok) throw new Error("Failed to delete the task");
}