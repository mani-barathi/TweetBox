import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { auth, provider } from "../firebase"

function Login() {
    const setUser = useContext(UserContext)[1]
    const history = useHistory();

    const loginUser = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = {
                    uid: result.user.uid,
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                }
                setUser(user)
                console.log(`Logged in as ${user.name}`)
                history.push('/')
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    return (
        <div className="row mt-5 justify-content-center">

            <div className="col">
                <div className="mt-5 py-5 w-100 py-4 px-4 border shadow-lg rounded" style={{ maxWidth: "350px", margin: "auto" }}>
                    <center>
                        <h2 className="display-4" >TweetBox</h2>
                        <button onClick={loginUser} className="btn btn-primary mt-5 btn-sm px-5">Sign In With Google</button>
                    </center>
                </div>
            </div>

        </div>
    )
}

export default Login
