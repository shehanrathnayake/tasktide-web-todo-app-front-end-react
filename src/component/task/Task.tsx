import {TaskDto} from "../../dto/TaskDto.ts";
import './Task.css'
import React, {ReactNode, useId, useRef, useState} from "react";
import {useTaskDispatcher} from "../../context/TaskContext.tsx";
import {deleteTask, updateTask} from "../../service/task-service.ts";

export function Task(task: TaskDto) {
    const id = useId();
    const taskDispatcher = useTaskDispatcher();
    const [checked, setChecked] = useState(task.status);
    const [displaySettings, setDisplaySettings] = useState(false);
    const [bgColor, setBgColor] = useState(`#c0f2fd`);

    function onHandleBlur() {

    }

    function onHandleClick(e: React.MouseEvent<HTMLDivElement>) {
        updateTask(task).then(val => {
            setChecked(!checked);
            taskDispatcher({
                type: 'update',
                task
            });
        }).catch(err => {
            alert("Failed to update the task, try again!");
        });
    }

    function onHandleClickSettings() {
        setDisplaySettings(!displaySettings);
    }

    function onHandleClickColors(e: React.MouseEvent<HTMLDivElement>) {
        setBgColor(`#${e.currentTarget.id}`)
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
                    <div onClick={onHandleClick} id={id}>
                        <div className={checked ? 'd-none' : 'd-block'} id="check-box"></div>
                        <i id="checked-sign" className={`${checked ? 'd-block' : 'd-none'} bi bi-check2-square`}></i>
                    </div>
                    <i onClick={onHandleClickSettings} id="task-settings" className="bi bi-three-dots"></i>
                </div>
                <textarea style={{backgroundColor: bgColor}} onBlur={onHandleBlur} rows={8} defaultValue={task.description}></textarea>
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