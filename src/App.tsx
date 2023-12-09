import './App.css'
import {SignIn} from "./component/signin/SignIn.tsx";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase.ts";
import {useEffect, useState} from "react";
import {Loader} from "./component/loader/Loader.tsx";
import {Header} from "./component/header/Header.tsx";
import {TaskList} from "./component/tasklist/TaskList.tsx";
import {TaskProvider} from "./context/TaskContext.tsx";
import {Footer} from "./component/footer/Footer.tsx";

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
                } else {
                    userDispatcher({type: 'sign-out'})
                }
            })
        };
    }, []);

  return (
    <>
        {
            loader ? <Loader />
            :
            user ?
                (<>
                    <TaskProvider>
                        <Header />
                        <TaskList />
                    </TaskProvider>
                    <Footer />
                </>)
                :
                <SignIn />
        }
    </>
  )
}

export default App
