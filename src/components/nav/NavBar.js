import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import logo from "./deedees-recipes-logo.png"

export const NavBar = () => {
    return (
        <>
        <div className="nav">
        <div className="logout-search-container">
            <Link className="navbar__link" id="logout" to="/search">Search</Link>
            <Link className="navbar__link" id="logout" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("recipe_user")
                    }}>Logout</Link>
        </div>
        
        <img src={logo} alt="deedees-logo" id="logo"/>
        
                    
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">My Recipes</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/recipes">Browse Recipes</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/create">New Recipe</Link>
            </li>
        </ul>
        </div>
        </>
    )
}