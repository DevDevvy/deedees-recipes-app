import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useHistory } from "react-router";
import { Steps } from "../recipes/Steps";
// create a function that lists out all the recipes in XML
export const EditRecipe = () => {
    // create recipe state
    const [recipe, setRecipe] = useState({})
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    const history = useHistory()
    const {recipeId} = useParams()
    // recipe with user, steps, ingredients
    useEffect(
        () => {
            fetch(`https://deedees-api-qdte8.ondigitalocean.app/recipes/${recipeId}?_expand=user&_embed=steps&_embed=ingredients`)
                .then(res => res.json())
                .then((data) => {
                    // set recipe state with data from API
                    setRecipe(data)
                    // set steps from API
                    setSteps(data.steps)
                    // set ingredients from API
                    setIngredients(data.ingredients)
                })
        },
        [recipeId]
    )
    
    const editRecipe = (id) => {
        // create recipe object with values from form 
        const editRecipe = {
            name: recipe.name,
            memory: recipe.memory,
            photo: recipe.photo,
            userId: parseInt(localStorage.getItem("recipe_user"))
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editRecipe)
        }
        return fetch(`https://deedees-api-qdte8.ondigitalocean.app/recipes/${id}`, fetchOption)
        // after recipe put, trigger steps
            .then(sendSteps)
            
    }
    // iterates through steps list to send to API one by one
    const sendSteps = () => {
        // iterate through steps to send one by one to API
        for (const singleStep of steps) {
            // send single step to function
            editSteps(singleStep)
        }
        // after all steps post, trigger sendIngredients
        sendIngredients()
    }
    // PUT to send step(s) to API
    const editSteps = (step) => {
            // use fetch method POST to send object into API
            const singleStep = step
            const id = step.id
            const fetchOption = {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(singleStep)
            }
            return fetch(`https://deedees-api-qdte8.ondigitalocean.app/steps/${id}`, fetchOption)
                
            
    }
    // iterate through all ingredients to send to API
    const sendIngredients = () => {
        for (const ingredient of ingredients) {
            editIngredients(ingredient)
        }
        // push user back to home page after all objects are sent
        history.push("/home")
    }

    const editIngredients = (ingredient) => {
            // use fetch method POST to send object into API
            const singleIngredient = ingredient
            const id = ingredient.id
            const fetchOption = {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(singleIngredient)
            }
            return fetch(`https://deedees-api-qdte8.ondigitalocean.app/ingredients/${id}`, fetchOption)
                
            
    }
    return (
        <>
            <form className="recipe-form">
            <h2 className="recipeForm__title">Edit Recipe</h2>
            <fieldset>
                {/* ------recipe memory------------ */}
                <div className="form-group-recipe">
                    <h3 className="memory-title">Memory</h3>
                    <textarea
                        required autoFocus
                        type="text"
                        className="memory"
                        // gets value from state to display in edit window
                        value={recipe.memory}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...recipe}
                                // modify copy of state with user input value
                                copy.memory = evt.target.value
                                // update state with new state
                                setRecipe(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                {/* --------recipe photo-------- */}
                <div className="form-group-recipe">
                    <label htmlFor="photo"><h3>Photo</h3></label>
                    <input
                        required
                        type="text"
                        className="form-photo"
                        value={recipe.photo}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...recipe}
                                // modify copy of state with user input value
                                copy.photo = evt.target.value
                                // update state with new state
                                setRecipe(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                    <h3>Steps</h3>
                { steps.map((stp, index) => {
                    return <div className="step-container" key={index}>
                        {/* minutes */}
                        <input
                        required 
                        type="number"
                        className="number"
                        value={steps[index].minutes}
                        // listens for state change
                        onChange={
                            (evt) => {
                                const copy = [...steps]
                                    copy[index].minutes = parseInt(evt.target.value)
                                    setSteps(copy)
                                }
                            }
                        />
                        {/* step */}
                        <input
                        required 
                        type="text"
                        className="step"
                        value={steps[index].step}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = [...steps]
                                    copy[index].step = evt.target.value
                                    setSteps(copy)
                                }
                                
                            }
                        />
                        
                    </div>
                    
                })}
            </fieldset>
            <fieldset>
                <h3>Ingredients</h3>
                {/* map through ingredients to output edit fields */}
                { ingredients.map((ingr, index) => (
                    <div className="ingredients-inner-container" key={index}>
                        <input
                            required 
                            type="text"
                            // key passed in to object will be "name"
                            name="name"
                            // makes value passed into object equal to current state
                            value={ingredients[index].name}
                            className="ingredient"
                            placeholder={`Ingredient ${index + 1}`}
                            id={`Ingredient${index + 1}`}
                            // listens for state change
                            onChange={
                                (evt) => {
                                    // copy state
                                    const copy = [...ingredients]
                                        copy[index].name = evt.target.value
                                        setIngredients(copy)
                                    }
                            } />
                            {/* amount of ingredient */}
                        <input
                            required 
                            type="text"
                            className="amount"
                            // so key passed into object will be "amount"
                            placeholder="Amount"
                            name="amount"
                            // makes value passed into object equal to current state
                            value={ingredients[index].amount}
                            id="amount1"
                            // listens for state change
                            onChange={
                                (evt) => {
                                    // copy state
                                    const copy = [...ingredients]
                                    copy[index].amount = evt.target.value
                                    setIngredients(copy)
                                }
                            } 
                            />
                            
                    </div>
                ))}
            </fieldset>
            
            <button type="button" className="btn btn-primary" id="save-recipe" onClick={()=> editRecipe(recipeId)}>
                Edit Recipe
            </button>
        </form>
        </>
    )
}

