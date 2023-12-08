import {TaskDto} from "../../dto/TaskDto.ts";
import './Task.css'

export function Task(task: TaskDto) {
    return (
        <li className="task align-self-start">
            <div id="task-body" className="card card-body">
                <div>
                    <input type="checkbox"/>
                </div>
                <textarea name="" id="" rows={8} defaultValue={task.description}></textarea>
            </div>
        </li>
    );
}