import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://deedees-api-qdte8.ondigitalocean.app/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("recipe_user", exists.id)
                    history.push("/home")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
        

            <section className="login-container">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to DeeDee's Recipes</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button onClick="" className="sign-in"type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <h4>Or...</h4>
                    <section className="link--register">
                <Link to="/register">Not a member yet? Click here and register!</Link>
                    </section>
                </form>
                
            </section>
            
            
        </main>
    )
}

