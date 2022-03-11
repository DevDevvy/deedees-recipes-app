import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./DeedeesRecipes.css"

export const DeedeesRecipes = () => (
    <>
        <Route
        render={() => {
            if (localStorage.getItem("recipe_user")) {
            return (
                <>
                <NavBar />
                <ApplicationView />
                </>
            );
            } else {
            return <Redirect to="/login" />;
            }
        }}
        />

        <Route path="/login">
        <Login />
        </Route>
        <Route path="/register">
        <Register />
        </Route>
    </>
);