import './App.css'
import {SignIn} from "./component/signin/SignIn.tsx";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase.ts";
import {useEffect} from "react";

function App() {

    const user = useUser();
    const userDispatcher = useUserDispatcher();

    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    userDispatcher({type: 'sign-in', user})
                } else {
                    userDispatcher({type: 'sign-out'})
                }
            })
        };
    }, []);

    function onHandleClick() {
        userDispatcher({type: 'sign-out'})
    }


  return (
    <>
        {
            user ?
                <div onClick={onHandleClick}><button className="btn btn-danger">Sign Out</button></div>
                :
                <SignIn />
        }

    </>
  )
}

export default App
