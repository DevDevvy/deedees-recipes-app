import React, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { getAllRecipes } from "../../ApiManager";
import { Ingredients } from "./Ingredients";
import "./RecipeForm.css"
import { Steps } from "./Steps";
export const RecipeForm = () => {
    // get recipe list
    const [recipes, setRecipes] = useState([])
    // recipe state with name, memory, photo, userid
    const [recipe, update] = useState({
        name: "",
        memory: "",
        photo: "",
        userId: null
    });
    // -----------------------------------------Hello, David.
    // ingredient list state
    const [ingredients, setIngredients] = useState([])
    // steps list state
    const [steps, setSteps] = useState([])

    // fetch recipes with expanded user
    const history = useHistory()
    useEffect(
        () => {
            getAllRecipes()
                .then((data) => {
                    // set recipe state with data from API
                    setRecipes(data)
                })
        },
        []
    )
    
    const saveRecipe = (event) => {
        // prevents default event 
        event.preventDefault()
        // create new recipe object
        const newRecipe = {
            name: recipe.name,
            memory: recipe.memory,
            photo: recipe.photo,
            userId: parseInt(localStorage.getItem("recipe_user"))
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newRecipe)
        }
        return fetch("http://localhost:8088/recipes", fetchOption)
            .then(sendSteps)
            
    }
    // iterates steps to send individual objects to API
    const sendSteps = () => {
        for (const step of steps) {
            saveSteps(step)
        }
        sendIngredients()
    }
    // sends object to API
    const saveSteps = (step) => {
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(step)
        }
        return fetch("http://localhost:8088/steps", fetchOption)
        
    }
    
    // save ingredients
    const saveIngredients = (ingredient) => {
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(ingredient)
        }
        return fetch("http://localhost:8088/ingredients", fetchOption)
            
        }
        // iterates through ingredients to send to API one by one
    const sendIngredients = () => {
        for (const ingredient of ingredients) {
            saveIngredients(ingredient)
            }
            
        history.push("/recipes")
    }



    return (
        <form className="recipe-form">
            <h2 className="recipeForm__title">New Recipe</h2>
            
            <fieldset>
                {/* --------recipe name ---------- */}
                <div className="form-group-recipe">
                <h3 className="recipe-name">Recipe Name</h3>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control-recipe"
                        placeholder="Recipe Name Here"
                        value={recipe.name}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...recipe}
                                // modify copy of state with user input value
                                copy.name = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="memory-container">
                {/* ------recipe memory------------ */}
                <div className="form-group-memory">
                    <h3 className="memory-title">Memory</h3>
                    <textarea
                        required autoFocus
                        type="text"
                        className="memory"
                        value={recipe.memory}
                        placeholder="Write your memory here..."
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...recipe}
                                // modify copy of state with user input value
                                copy.memory = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="recipe-photo">
                {/* --------recipe photo-------- */}
                <div className="form-group-recipe">
                    <label htmlFor="photo"><h3>Photo</h3></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-photo"
                        placeholder="Photo URL"
                        value={recipe.photo}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...recipe}
                                // modify copy of state with user input value
                                copy.photo = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <section className="steps-ingredients-container">
            {/* --------------steps container-------------- */}
            <div className="steps-container">
                <h3 className="steps-and-ingredients-labels">STEPS</h3>
                <Steps
                    steps = {steps}
                    setSteps = {setSteps}
                    recipes = {recipes}
                    />
            </div>
            {/* --------------ingredients container-------------- */}
            <div className="steps-container">
                <h3 className="steps-and-ingredients-labels">INGREDIENTS</h3>
                        <Ingredients
                            ingredients = {ingredients}
                            setIngredients = {setIngredients}
                            recipes = {recipes}
                            />
            </div>
            </section>
            {/* button for submit with onClick event listener that calls saveTicket (POST to API) */}
            <button className="btn btn-primary" id="save-recipe" onClick={saveRecipe}>
                Save Recipe
            </button>
        </form>
    )
}