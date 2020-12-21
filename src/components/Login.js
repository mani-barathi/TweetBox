import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function Login() {
    const setUser = useContext(UserContext)[1]
    const history = useHistory();
    const [input, setInput] = useState('')

    const loginUser = (e) => {
        e.preventDefault()
        setUser(input)
        console.log(`Logged in as ${input}`)
        setInput('')
        history.push('/')
    }

    return (
        <div className="row mt-5 justify-content-center">

            <div className="col">
                <form className="mt-5 w-100 py-4 px-4 border shadow-lg rounded" style={{ maxWidth: "350px", margin: "auto" }}>
                    <h3 >Login</h3>
                    <hr />
                    <input type="text" value={input} onChange={e => { setInput(e.target.value) }} placeholder="Enter your name.." className="form-control" />
                    <button onClick={loginUser} className="btn btn-primary mt-2 btn-sm">Send</button>
                </form>
            </div>

        </div>
    )
}

export default Login
