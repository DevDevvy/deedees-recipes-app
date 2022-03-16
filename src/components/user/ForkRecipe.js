import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Steps } from "../recipes/Steps";
import { getAllForkedRecipes } from "../../ApiManager";
// create a function that lists out all the recipes in XML
export const ForkRecipe = () => {
  // create recipe state
    const [recipe, setRecipe] = useState({});
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [forkedRecipes, setForkedRecipes] = useState([])
    const history = useHistory();
    const { recipeId } = useParams();

    // adds empty step field
    const handleAddFieldsSteps = () => {
    setSteps([
        ...steps,
        {
        step: "",
        stepNumber: steps.length + 1,
        recipeId: undefined,
        minutes: undefined,
        },
    ]);
    };

  // deletes step 
    const handleDeleteFieldsSteps = (event, index) => {
    event.preventDefault()
    const values = [...steps];
    values.splice(index, 1)
    setSteps(values);
    };
    // adds empty field for ingredients
    const handleAddFieldsIngredients = () => {
    setIngredients([
        ...ingredients,
        {
            name: "",
            amount: "",
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
    fetch(`http://localhost:8088/recipes/${recipeId}?_expand=user&_embed=steps&_embed=ingredients`)
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
                .then((data) => {
                    // set recipe state with data from API
                    setForkedRecipes(data)
                })
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
        return fetch("http://localhost:8088/forkedRecipes", fetchOption)
            .then(sendSteps);
    };
  // sends object to API
    const saveSteps = (step) => {
        // use fetch method POST to send object into API
        step.recipeId = forkedRecipes.length + 1
        
        const fetchOption = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(step),
        };
        return fetch("http://localhost:8088/forkedSteps", fetchOption);
    };

  // save ingredients
    const saveIngredients = (ingredient) => {
    // use fetch method POST to send object into API
    const fetchOption = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
    };
    return fetch("http://localhost:8088/forkedIngredients", fetchOption);
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
        ingredient.recipeId = forkedRecipes.length + 1
        saveIngredients(ingredient);
    }
    // push user back to home page after all objects are sent
    history.push("/home");
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
                    autoFocus
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
            
            <fieldset>
                <h3>Steps</h3>
                {steps.map((stp, index) => {
                return (
                    <div className="step-container" key={index}>
                    {/* minutes */}
                    <input
                        required
                        type="number"
                        className="number"
                        placeholder="Minutes"
                        value={steps[index].minutes}
                    // listens for state change
                        onChange={(evt) => {
                            const copy = [...steps];
                            copy[index].minutes = parseFloat(evt.target.value);
                            setSteps(copy);
                        }}
                    />
                    {/* step */}
                    <input
                        required
                        type="text"
                        className="step"
                        placeholder="Step"
                        value={steps[index].step}
                    // listens for state change
                        onChange={(evt) => {
                            // copy state
                            const copy = [...steps];
                            copy[index].step = evt.target.value;
                            copy.stepNumber = index + 1
                            
                            setSteps(copy);
                        }}
                    />
                    <div className="button-container">
                <button 
                    className="add-step" 
                    onClick={(e) => handleAddFieldsSteps(e)}
                    >+</button>
                <button
                    className="delete-step"
                    onClick={(e, index) => handleDeleteFieldsSteps(e, index)}
                    >-</button>
                </div>
                    </div>
                );
                })}
                
            </fieldset>
            <fieldset>
                <h3>Ingredients</h3>
            {/* map through ingredients to output edit fields */}
                {ingredients.map((ingr, index) => (
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
                        onChange={(evt) => {
                        // copy state
                            const copy = [...ingredients];
                            copy[index].name = evt.target.value;
                            setIngredients(copy);
                        }}
                    />
                    { /* amount of ingredient */}
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
                        onChange={(evt) => {
                        // copy state
                            const copy = [...ingredients];
                            copy[index].amount = evt.target.value;
                            setIngredients(copy);
                        }}
                    />
                </div>
                ))}
                <div className="button-container">
                    <button
                        className="add-step"
                        onClick={(event) => handleAddFieldsIngredients(event)}
                    >+
                    </button>
                    <button
                        className="delete-step"
                        onClick={(event) => handleDeleteFieldsIngredients(event)}
                    >-
                    </button>
                </div>
            </fieldset>

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
