import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { DeedeesRecipes } from "./components/DeedeesRecipes"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <DeedeesRecipes />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)