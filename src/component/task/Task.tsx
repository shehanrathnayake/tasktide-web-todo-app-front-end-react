import {TaskDto} from "../../dto/TaskDto.ts";
import './Task.css'
import React, {useId, useState} from "react";
import {useTaskDispatcher} from "../../context/TaskContext.tsx";
import {deleteTask, updateTask} from "../../service/task-service.ts";

export function Task(task: TaskDto) {
    const id = useId();
    const taskDispatcher = useTaskDispatcher();
    const [checked, setChecked] = useState(task.status);
    const [displaySettings, setDisplaySettings] = useState(false);
    const [bgColor, setBgColor] = useState(`${task.color}`);
    const [value, setValue] = useState(task.description);

    function onHandleBlurTextArea() {
        if (value) updateTasks(checked, bgColor);
        else onHandleClickDelete();
    }

    function onHandleClickChecked(e: React.MouseEvent<HTMLDivElement>) {
        let status = !checked;
        setChecked(status);
        updateTasks(status, bgColor);
    }

    function onHandleClickColors(e: React.MouseEvent<HTMLDivElement>) {
        let changedColor = `#${e.currentTarget.id}`;
        setBgColor(changedColor);
        updateTasks(checked, changedColor);
    }

    function updateTasks(checked:boolean | null, bgColor:string) {
        updateTask(task, value, checked, bgColor).then(val => {
            taskDispatcher({
                type: 'update',
                task,
                description: value,
                status: checked,
                color: bgColor
            });
        }).catch(err => {
            alert("Failed to update the task, try again!");
        });
    }

    function onHandleClickSettings() {
        setDisplaySettings(!displaySettings);
    }

    function onHandleClickDelete() {
        deleteTask(task.id!, task.email!).then(val => {
            taskDispatcher({
                type: 'delete',
                id: task.id,
                email: task.email
            });
        }).catch(err => {
            alert("Failed to delete the task. try again!")
        })
    }

    return (
        <li className="task align-self-start">
            <div style={{backgroundColor: bgColor}} id="task-body" className="card card-body">
                <div id="task-container-header" className="d-flex justify-content-between align-items-center pb-2">
                    <div onClick={onHandleClickChecked} id={id}>
                        <div className={checked ? 'd-none' : 'd-block'} id="check-box"></div>
                        <i id="checked-sign" className={`${checked ? 'd-block' : 'd-none'} bi bi-check2-square`}></i>
                    </div>
                    <i onClick={onHandleClickSettings} id="task-settings" className="bi bi-three-dots"></i>
                </div>
                <textarea style={{backgroundColor: bgColor}} onBlur={onHandleBlurTextArea} value={value} onChange={e => setValue(e.target.value)} rows={8}></textarea>
            </div>
            <div id="background-colors" className={`${displaySettings ? 'd-flex' : 'd-none'} flex-column gap-2 card card-body`}>
                <i onClick={onHandleClickDelete} id="task-trash" className="bi bi-trash3"></i>
                <div id="setting-separator"></div>
                <div onClick={onHandleClickColors} id="c0f2fd" className="color-box"></div>
                <div onClick={onHandleClickColors} id="fdf9c0" className="color-box"></div>
                <div onClick={onHandleClickColors} id="c0fdc8" className="color-box"></div>
                <div onClick={onHandleClickColors} id="fdc0f5" className="color-box"></div>
                <div onClick={onHandleClickColors} id="fdd7c0" className="color-box"></div>
            </div>
        </li>
    );
}