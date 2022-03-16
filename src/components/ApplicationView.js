import React from "react"
import { Route } from "react-router-dom"
import { Recipe } from "./recipes/Recipe"
import { RecipeForm } from "./recipes/RecipeForm"
import { RecipeList } from "./recipes/RecipeList"
import { HomePage } from "./user/HomePage"
import { EditRecipe } from "./user/EditRecipe"
import { Redirect } from "react-router"
import {SearchBar} from "./search/Search"
import { ForkRecipe } from "./user/ForkRecipe"
export const ApplicationView = () => {
    return (
        <>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/recipes">
                <RecipeList />
            </Route>
            <Route path="/recipes/:recipeId(\d+)">
                < Recipe />
            </Route>
            <Route exact path="/create">
                < RecipeForm />
            </Route>
            <Route exact path="/home">
                <HomePage />
            </Route>
            <Route exact path="/edit/:recipeId(\d+)">
                <EditRecipe />
            </Route>
            <Route exact path="/fork/:recipeId(\d+)">
                <ForkRecipe />
            </Route>
            <Route exact path="/search">
                <SearchBar />
            </Route>
        </>
    )
}