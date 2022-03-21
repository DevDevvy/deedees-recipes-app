import React from "react";
import { useState } from "react";
import "./Steps.css"

export const Steps = (props) => {
// sets state for input field array to add/subtract steps
    const [inputFields, setInputField] = useState([
        {
            step: "",
            stepNumber: null,
            recipeId: null,
            minutes: null
        }
    ])
// adds step
    const handleAddFields = () => {
        setInputField([...inputFields,
            {
                step: "",
                stepNumber: null,
                recipeId: null,
                minutes: null
            }
        ])
    }
    // deletes step
    const handleDeleteFields = (index) => {
        const values = [...inputFields]
        values.splice(index, 1)
        setInputField(values)
    }

    return <section>
        <fieldset className="new-steps">
            { inputFields.map((inputField, index) => (
                <div className="step-container" key={index}>
                    {/* minutes */}
                    <input
                    required 
                    type="number"
                    className="number"
                    placeholder="Minutes"
                    id={`minutes${index + 1} `}
                    // listens for state change
                    onChange={
                        (evt) => {
                            const copy = [...props.steps]
                            if (copy.length === index) {
                                const step = {
                                    recipeId: props.recipes.length + 1,
                                    step: "",
                                    stepNumber: index + 1,
                                    minutes: parseFloat(evt.target.value)
                                }
                                copy.push(step)
                                props.setSteps(copy)
                            } else {
                                copy[index].minutes = parseFloat(evt.target.value)
                                props.setSteps(copy)
                            }
                        }
                    } />
                    {/* step */}
                    <input
                    required autoFocus
                    type="text"
                    className="step"
                    placeholder={`Step ${index + 1} `}
                    id={`step${index + 1} `}
                    // listens for state change
                    onChange={
                        (evt) => {
                            // copy state
                            const copy = [...props.steps]
                            // make step object if
                            if (copy.length === index) {
                                const step = {
                                    recipeId: props.recipes.length + 1,
                                    step: evt.target.value,
                                    stepNumber: index + 1,
                                    minutes: null
                                }
                                copy.push(step)
                                props.setSteps(copy)
                            } else {
                                copy[index].step = evt.target.value
                                props.setSteps(copy)
                            }
                        }
                    } />
                    <div className="ing-buttons">
                    {/* add/delete field buttons */}
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
