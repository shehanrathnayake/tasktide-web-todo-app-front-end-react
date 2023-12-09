import './Header.css'
import {useUser} from "../../context/UserContext.tsx";
import React, {useEffect, useRef, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../../firebase.ts";
import {useTaskDispatcher} from "../../context/TaskContext.tsx";
import {saveTask} from "../../service/task-service.ts";
import {TaskDto} from "../../dto/TaskDto.ts";
export function Header() {
    const user = useUser();
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [profileDisplay, setProfileDisplay] = useState(false);
    const [newTaskDisplay, setNewTaskDisplay] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const taskDispatcher = useTaskDispatcher();
    const [value, setValue] = useState("");

    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    let image = user?.photoURL
                    setImageUrl(image || undefined)

                } else {
                    setImageUrl("")
                }
            })
        };
    }, []);

    function onHandleClick() {
        signOut(auth)
    }

    function onHandleImageClick() {
        setProfileDisplay(!profileDisplay)
    }

    function onHandleBtnNewClick() {
        setNewTaskDisplay(true);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }

    function onHandleAddNewTask(e: React.FormEvent) {
        e.preventDefault();
        if (!value.trim()) {
            setValue("");
            setNewTaskDisplay(false);
            return;
        }
        saveTask(new TaskDto(null, value,null, user?.email!))
            .then(task => {
                taskDispatcher({type: 'add', task});
                setValue("");
                setNewTaskDisplay(false);
            }).catch(err => {
                alert("Failed to save the task, try again");
        })
    }

    return (
        <>
            <div id="header-container" className="container p-1 border-bottom bg-white">
                <div className="row p-2 d-flex">
                    <div className="col">
                        <a id="main-title" className="d-flex align-items-start justify-content-start gap-3" href="#">
                            <img id="img-header" src="/src/assets/tasktide-logo.png" alt="Tasktide logo"/>
                            <h2 className="m-0" id="txt-title">TaskTide</h2>
                        </a>
                    </div>
                    <div className="`${user ? d-flex : d-none}` col justify-content-end">
                        <div className="d-flex gap-3" id="header-right">
                            <button onClick={onHandleBtnNewClick} id="btn-new" className="btn btn-info btn-sm"><i className="bi bi-plus-lg"></i> NEW</button>
                            <img onClick={onHandleImageClick} id="img-user" className="img-fluid" src={user ? imageUrl : ""} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={profileDisplay ? "d-block" : "d-none"} id="header-profile-container">
                    <div className="card card-body">
                        <div id="user-name" className="text-center border-bottom py-2">{user?.displayName}</div>
                        <div id="user-email" className="text-center border-bottom py-2">{user?.email}</div>
                        <div>
                            <button onClick={onHandleClick} className="mt-3 btn btn-danger btn-sm w-100">Sign Out</button>
                        </div>

                    </div>

                </div>
            </div>
            <div id="new-task-container" className={`task vh-100 ${newTaskDisplay ? 'd-flex' : 'd-none'} justify-content-center align-items-center`}>
                <div>
                    <form onBlur={onHandleAddNewTask} id="new-task-card" className="card card-body w-300">
                        <div>
                            <input type="checkbox"/>
                        </div>
                        <textarea value={value} onChange={e => setValue(e.target.value)} ref={textareaRef} placeholder="Write anything..." rows={8}></textarea>
                    </form>
                </div>
            </div>
        </>


    );
}