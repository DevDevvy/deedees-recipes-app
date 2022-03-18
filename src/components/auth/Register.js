import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("recipe_user", createdUser.id)
                                history.push("/recipes")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <article className="register-container">
            
            
            <form className="form--login" onSubmit={handleRegister}>
            {/* <button className="close-register" onClick={e => history.push("/login")}>Close</button> */}
                <h1 className="h3 mb-3 font-weight-normal">Welcome, please register here.</h1>
                <fieldset>
                    <label className="labels" htmlFor="name"> User Name </label>
                    <input onChange={updateUser}
                            type="text" id="name" className="form-control"
                            placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="labels" htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button onClick={handleRegister} onTouchStart={handleRegister} className="register" type="submit"> Register </button>
                </fieldset>
            </form>
            </article>
        </main>
    )
}

