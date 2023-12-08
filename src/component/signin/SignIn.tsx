import {auth} from "../../../firebase.ts";
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import './SignIn.css'
export function SignIn() {
    function handleSignIn(){
        signInWithPopup(auth, new GoogleAuthProvider());
    }
    return (
        <div id="signin-view" className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img className="mb-2" id="img-logo-signin" src="src/assets/tasktide-logo.png" alt="TaskTide app logo"/>
            <h2 className="text-bold mb-4">TaskTide</h2>
            <img id="btn-google-signin" onClick={handleSignIn} src="src/assets/google/web_light_rd_SI@1x.png" alt="google signin"/>
        </div>
    );
}