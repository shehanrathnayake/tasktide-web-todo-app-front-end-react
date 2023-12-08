import './Header.css'
import {useUser} from "../../context/UserContext.tsx";
import {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../../firebase.ts";
export function Header() {
    const user = useUser();


    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [profileDisplay, setProfileDisplay] = useState(false);

    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    let image = user?.photoURL
                    setImageUrl(image || undefined)

                } else {
                    setImageUrl("#")
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

    return (
        <div id="header-container" className="container p-1 border-bottom">
            <div className="row p-2 d-flex">
                <div className="col">
                    <a id="main-title" className="d-flex align-items-start justify-content-start gap-3" href="#">
                        <img id="img-header" src="/src/assets/tasktide-logo.png" alt="Tasktide logo"/>
                        <h2 className="m-0" id="txt-title">TaskTide</h2>
                    </a>
                </div>
                <div className="`${user ? d-flex : d-none}` col justify-content-end">
                    <div id="img-user-cover">
                        <img onClick={onHandleImageClick} id="img-user" className="img-fluid" src={user ? imageUrl : "#"} alt=""/>
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
    );
}