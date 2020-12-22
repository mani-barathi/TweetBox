import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/userContext"
import { auth } from "../firebase"
function Navbar({ setShowPostForm }) {
    const [user, setUser] = useContext(UserContext)

    const logoutUser = () => {
        setShowPostForm(false)
        auth.signOut()
            .then(() => setUser(null))
            .catch(err => alert(err.message))
    }

    return (
        <nav className="navbar sticky-top navbar-dark bg-dark">
            <span className="navbar-brand mb-0 " style={{ userSelect: 'none' }}>TweetBox</span>
            <div className="d-flex align-items-center">
                {(user) ? (
                    <div>

                        <Link className="text-white mr-1 border-0 shadow-none" to="/" title="Go to Post">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg>
                        </Link>

                        <button onClick={e => { setShowPostForm(true) }} className="btn mr-1 ml-1 text-light border-0 shadow-none" title="create a new post">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                        </button>

                        <Link to="/myposts" className="mr-1 text-white border-0 shadow-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            </svg>
                        </Link>

                        <button onClick={logoutUser} className="btn  text-light border-0 shadow-none">
                            Logout
                            </button>
                    </div>
                ) : (
                        <> </>
                    )
                }

            </div>
        </nav>
    )
}

export default Navbar
