import React, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { getAllRecipes, saveSteps, saveIngredients } from "../../ApiManager";
import { Ingredients } from "./Ingredients";
import "./RecipeForm.css"
import { Steps } from "./Steps";


// function outputs the main component for a new recipe 
export const RecipeForm = () => {
    const history = useHistory()
    // set up needed states - recipe, recipes, ingredients, steps
    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const [recipe, update] = useState({
        name: "",
        memory: "",
        photo: "",
        userId: null
    });

    useEffect(
        () => {
            getAllRecipes()
                .then((data) => {
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
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/recipes", fetchOption)
            .then(sendSteps)
    }
    // iterates steps to send individual objects to API
    const sendSteps = () => {
        for (const step of steps) {
            saveSteps(step)
        }
        sendIngredients()
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
                        required 
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
                        } 
                    />
                </div>
            </fieldset>
            <fieldset className="recipe-photo">
                {/* --------recipe photo-------- */}
                <div className="form-group-recipe">
                    <label htmlFor="photo"><h3>Photo</h3></label>
                    <input
                        required 
                        type="text"
                        className="form-photo"
                        placeholder="Photo URL"
                        value={recipe.photo}
                        onChange={
                            (evt) => {
                                const copy = {...recipe}
                                copy.photo = evt.target.value
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
                        required 
                        type="text"
                        className="memory"
                        value={recipe.memory}
                        placeholder="Write your memory here..."
                        onChange={
                            (evt) => {
                                const copy = {...recipe}
                                copy.memory = evt.target.value
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
            <button 
                className="btn btn-primary" 
                id="save-recipe" 
                onClick={saveRecipe}
                >Save Recipe
            </button>
        </form>
    )
}