import './App.css'
import {SignIn} from "./component/signin/SignIn.tsx";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../firebase.ts";
import {useEffect, useState} from "react";
import {Loader} from "./component/loader/Loader.tsx";
import {Header} from "./component/header/Header.tsx";
import {Task} from "./component/task/Task.tsx";

function App() {

    const user = useUser();
    const userDispatcher = useUserDispatcher();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, (user) => {
                setLoader(false)
                if (user) {
                    userDispatcher({type: 'sign-in', user})
                    console.log(user)
                } else {
                    userDispatcher({type: 'sign-out'})
                }
            })
        };
    }, []);

    function onHandleClick() {
        signOut(auth)
    }

    const taskList = [
        {'id': 1, 'description': 'Task 1', 'status': true, 'email': 'abc'},
        {'id': 2, 'description': 'Task 2', 'status': false, 'email': 'abc'},
        {'id': 3, 'description': 'Task 3', 'status': true, 'email': 'abc'},
        {'id': 4, 'description': 'Task 4', 'status': true, 'email': 'abc'},
        {'id': 5, 'description': 'Task 5', 'status': true, 'email': 'abc'},
        {'id': 6, 'description': 'Task 5', 'status': true, 'email': 'abc'},
        {'id': 7, 'description': 'Task 5', 'status': true, 'email': 'abc'}
    ]


  return (
    <>
        {
            loader ? <Loader />
            :
            user ?
                (<>
                    <Header />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <ul className="d-flex justify-content-center align-content-center gap-2 flex-wrap list-unstyled">
                                    {taskList.map(task =>
                                        <Task key={task.id} {...task} />
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                </>)
                :
                <SignIn />
        }
    </>
  )
}

export default App
