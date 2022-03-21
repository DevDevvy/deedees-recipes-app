import React, { useState } from "react";
import "./Ingredients.css"

// component responsible for ingredients steps in the recipe form, takes ingredients props
export const Ingredients = (props) => {
    // set up input fields state
    const [inputFields, setInputField] = useState([
        {
            name: "",
            amount: ""
        }
    ])
// adds another step to input field
    const handleAddFields = () => {
        setInputField([...inputFields,
            {
                name: "",
                amount: ""
            }
        ])
    }
    // deletes step from input field
    const handleDeleteFields = (index) => {
        const values = [...inputFields]
        values.splice(index, 1)
        setInputField(values)
    }

        
    return <section>
            <fieldset className="outer-container">
                { inputFields.map((inputField, index) => (
                    <div className="ingredients-inner-container" key={index}>
                        <div className="input-container">
                        {/* --------ingredient -------- */}
                        
                            {/* <label htmlFor="ingredient 1">Ingredient 1:</label> */}
                            
                            <input
                                required 
                                type="text"
                                // key passed in to object will be "name"
                                name="name"
                                // makes value passed into object equal to current state
                                value={props.ingredients.name}
                                className="ingredient"
                                placeholder={`Ingredient ${index + 1}`}
                                id={`Ingredient${index + 1}`}
                                
                                // listens for state change
                                onChange={
                                    (evt) => {
                                        // copy state
                                        const copy = [...props.ingredients]
                                        // make step object
                                        if (copy.length === index) {
                                            const ingredient = {
                                                recipeId: props.recipes.length + 1,
                                                name: evt.target.value,
                                                amount: ""
                                            }
                                            copy.push(ingredient)
                                            props.setIngredients(copy)
                                        } else {
                                            copy[index].name = evt.target.value
                                            props.setIngredients(copy)
                                        }
                                        // conditional to see if there
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
                                value={props.ingredients.amount}
                                id="amount1"
                                // listens for state change
                                onChange={
                                    (evt) => {
                                        // copy state
                                        const copy = [...props.ingredients]
                                        // make step object if theres nothing there
                                        if (copy.length === index) {
                                            const ingredient = {
                                                recipeId: props.recipes.length + 1,
                                                amount: evt.target.value,
                                                name: ""
                                            }
                                            copy.push(ingredient)
                                            props.setIngredients(copy)
                                        } else {
                                        copy[index].amount = evt.target.value
                                        props.setIngredients(copy)
                                        }
                                    }
                                } 
                                />
                                </div>
                                {/* add/delete field buttons */}
                                <div className="ing-buttons">
                                <button className="add-step"
                                    onClick={() => handleAddFields()}
                                >+</button>
                                <button className="delete-step"
                                    onClick={() => handleDeleteFields(index)}
                                >-</button>
                                </div>
                    </div>
                ))}
            </fieldset>
        </section>
}
