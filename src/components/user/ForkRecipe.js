import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { getAllForkedIngredients, getAllForkedRecipes, getAllForkedSteps, getAllRecipes } from "../../ApiManager";
import "./ForkRecipe.css"
import { ForkedIngredients } from "./ForkIngredients";
import { ForkedSteps } from "./ForkSteps";

// create a function that lists out all the recipes in XML
export const ForkRecipe = () => {
  // create recipe state
    const [recipe, setRecipe] = useState({});
    const [recipes, setRecipes] = useState([])
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([])
    const [forkedRecipes, setForkedRecipes] = useState([])
    const [allSteps, setAllSteps] = useState([])
    const history = useHistory();
    const { recipeId } = useParams();

    // adds empty step field
    const handleAddFieldsSteps = () => {
    setSteps([
        ...steps,
        {
        step: "",
        stepNumber: steps.length + 1,
        recipeId: parseInt(recipeId),
        minutes: null,
        forkedRecipeId: forkedRecipes.length + 1
        },
    ]);
    };
  // deletes step 
    const handleDeleteFieldsSteps = (event, index) => {
    event.preventDefault()
    const values = [...steps];
    values.pop()
    setSteps(values);
    };
    // adds empty field for ingredients
    const handleAddFieldsIngredients = () => {
    setIngredients([
        ...ingredients,
        {
            name: "",
            amount: "",
            recipeId: parseInt(recipeId),
            forkedRecipeId: forkedRecipes.length + 1
        },
    ]);
    };
  // deletes ingredient
    const handleDeleteFieldsIngredients = (event) => {
    event.preventDefault();
    const values = [...ingredients];
    values.pop();
    setIngredients(values);
    };

    // -------api calls------------------------
  // recipe with user, steps, ingredients
    useEffect(() => {
    fetch(`https://deedees-api-qdte8.ondigitalocean.app/recipes/${recipeId}?_expand=user&_embed=steps&_embed=ingredients`)
        .then((res) => res.json())
        .then((data) => {
            setSteps(data.steps);
            setIngredients(data.ingredients);
            // copy recipe and reset memory field to new message
            const copy = {...data}
            copy.memory="Love it! Here's my version..."
            setRecipe(copy)
            
        });
    }, [recipeId]);
    
    useEffect(
        () => {
            
            getAllForkedRecipes()
                .then((data) => {setForkedRecipes(data)})
                .then(getAllRecipes)
                .then((data) => {setRecipes(data)})
                .then(getAllForkedSteps)
                .then((data) => {setAllSteps(data)})
                .then(getAllForkedIngredients)
                .then((data) => {setAllIngredients(data)})
        },
        []
    )

    const saveRecipe = (event) => {
    // create new recipe object
    
        const newRecipe = {
            forkedFromId: parseInt(recipeId),
            name: recipe.name + " " + "(Forked)",
            memory: recipe.memory,
            photo: recipe.photo,
            userId: parseInt(localStorage.getItem("recipe_user")),
        };
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        };
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedRecipes", fetchOption)
        .then(clearIds)
        .then(sendSteps);
    };
    // clears id keys off of steps/ingredients objets to send back into API
    const clearIds = () => {
        steps.forEach(step => {
            if (step.id) {
                delete step['id']
            }
        })
        ingredients.forEach(ing => {
            if (ing.id) {
                delete ing['id']
            }
        })
    }
  // sends object to API
    const saveSteps = (step) => {
        // use fetch method POST to send object into API
        step.forkedRecipeId = forkedRecipes.length + 1
        const fetchOption = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(step),
        };
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedSteps", fetchOption);
    };

  // save ingredients
    const saveIngredients = (ingredient) => {
    // use fetch method POST to send object into API
    ingredient.forkedRecipeId = forkedRecipes.length + 1
    const fetchOption = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    };
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedIngredients", fetchOption);
    };

  // iterates through steps list to send to API one by one
    const sendSteps = () => {
    // iterate through steps to send one by one to API
    for (const singleStep of steps) {
      // send single step to function
        saveSteps(singleStep);
    }
    // after all steps post, trigger sendIngredients
    sendIngredients();
    };

  // iterate through all ingredients to send to API
    const sendIngredients = () => {
    for (const ingredient of ingredients) {
        saveIngredients(ingredient);
    }
    // push user back to home page after all objects are sent
    history.push(`/recipes/${recipeId}`);
    };
    
    return (
    <>
        <form className="recipe-form">
            <h2 className="recipeForm__title">Fork Recipe</h2>
            <fieldset>
            {/* ------recipe memory------------ */}
                <div className="form-group-recipe">
                <h3 className="memory-title">Memory/Message:</h3>
                <textarea
                    
                    type="text"
                    placeholder="Memory or story here..."
                    className="memory"
                // gets value from state to display in edit window
                    value={recipe.memory}
                // listens for state change
                    onChange={(evt) => {
                    // copy state
                    const copy = { ...recipe };
                    // modify copy of state with user input value
                    copy.memory = evt.target.value;
                    // update state with new state
                    setRecipe(copy);
                    }}
                />
                </div>
            </fieldset>
            <div className="steps-ingredients-container">
            <div className="step-container">
            <fieldset className="steps-container">
                <h3>Steps</h3>
                <ForkedSteps
                    steps={steps}
                    setSteps={setSteps}
                    handleDeleteFieldsSteps={handleDeleteFieldsSteps}
                    recipes={recipes}
                    forkedRecipes={forkedRecipes}
                    allSteps={allSteps}
                    />
                    <div className="button-container">
                        <button
                            className="delete-step"
                            onClick={(e, index) => handleDeleteFieldsSteps(e, index)}
                            >-</button>
                        <button 
                            className="add-step" 
                            onClick={(e) => handleAddFieldsSteps(e)}
                            >+</button>
                    </div>
                </fieldset>
            </div>
            <div className="step-container">
            <fieldset className="steps-container">
                <h3>Ingredients</h3>
            <ForkedIngredients
                ingredients={ingredients}
                setIngredients={setIngredients}
                handleDeleteFieldsIngredients={handleDeleteFieldsIngredients}
                forkedRecipes={forkedRecipes}
                allIngredients={allIngredients}
            />
                <div className="button-container">
                    <button
                        className="delete-step"
                        onClick={(event) => handleDeleteFieldsIngredients(event)}
                    >-</button>
                    <button
                        className="add-step"
                        onClick={(event) => handleAddFieldsIngredients(event)}
                    >+</button>
                    
                </div>
            </fieldset>
            </div>
            </div>
            <button
                type="button"
                className="btn btn-primary"
                id="save-recipe"
                onClick={(event) => saveRecipe(event)}
            >
                Send Recipe!
            </button>
    </form>
    </>
);
};
