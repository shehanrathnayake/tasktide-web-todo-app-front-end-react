import './TaskList.css'
import {Task} from "../task/Task.tsx";
import {useEffect} from "react";
import {getAllTasks} from "../../service/task-service.ts";
import {useTaskDispatcher, useTaskList} from "../../context/TaskContext.tsx";
import {useUser} from "../../context/UserContext.tsx";
export function TaskList() {

    // const taskList = [
    //     {'id': 1, 'description': 'Task 1', 'status': true, 'email': 'abc'},
    //     {'id': 2, 'description': 'Task 2', 'status': false, 'email': 'abc'},
    //     {'id': 3, 'description': 'Task 3', 'status': true, 'email': 'abc'},
    //     {'id': 4, 'description': 'Task 4', 'status': true, 'email': 'abc'},
    //     {'id': 5, 'description': 'Task 5', 'status': true, 'email': 'abc'},
    //     {'id': 6, 'description': 'Task 5', 'status': true, 'email': 'abc'},
    //     {'id': 7, 'description': 'Task 5', 'status': true, 'email': 'abc'}
    // ];

    const taskList = useTaskList();
    const taskDispatcher = useTaskDispatcher();
    const user = useUser();

    useEffect(() => {
        getAllTasks(user!.email!).then(taskList => {
            taskDispatcher({type: 'set-list', taskList})
        }).catch(err => {
            alert("Failed to load tasks")
        })
        return () => {
            taskDispatcher({type: 'set-list', taskList: []});
        };
    }, []);


    return (
        <div id="taskList-container" className="container">
            <div className="row">
                <div className="col">
                    <ul className="d-flex justify-content-center align-content-center gap-3 flex-wrap list-unstyled">
                        {taskList.map(task =>
                            <Task key={task.id} {...task} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}