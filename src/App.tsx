import './App.css'
import {SignIn} from "./component/signin/SignIn.tsx";
import {useUser, useUserDispatcher} from "./context/UserContext.tsx";
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../firebase.ts";
import {useEffect, useState} from "react";
import {Loader} from "./component/loader/Loader.tsx";
import {Header} from "./component/header/Header.tsx";

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


  return (
    <>
        {
            loader ? <Loader />
            :
            user ?
                (<>
                    <Header />

                </>)
                :
                <SignIn />
        }
    </>
  )
}

export default App
