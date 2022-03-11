import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getAllComments, getAllIngredients, getAllSteps, getAllUsers, getUserRecipe } from "../../ApiManager";
import { CommentForm } from "../comments/CommentForm";
import { Comments } from "../comments/Comments";
import "./Recipe.css"
// create a function that lists out all the recipes in XML
export const Recipe = () => {
    // create recipe state
    const [comments, setComments] = useState([])
    const [recipe, setRecipes] = useState([])
    const [users, setUsers] = useState([])
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] =useState([])
    const {recipeId} = useParams()

    useEffect(
        () => {
            getUserRecipe(recipeId)
                .then((data) => {
                    // set recipe state with data from API
                    setRecipes(data)
                })
        },
        [recipeId]
    )
    useEffect(
        () => {
            getAllUsers()
                .then((data) => {setUsers(data)})
                .then(getAllSteps)
                .then((data) => {setSteps(data)})
                .then(getAllIngredients)
                .then((data) => {setIngredients(data)})
        },
        []
    )

    useEffect(
        () => {
            getAllComments()
                .then((data) => {
                    // set step state with data from API
                    setComments(data)
                })
        },
        []
    )
    
    // get list of ingredients that match recipe id
    const list = ingredients.filter((ingredient) => {
        return parseInt(ingredient.recipeId) === parseInt(recipeId)
    })
    // get list of steps that match recipe id
    const stepsList = steps.filter((step) => {
        return parseInt(step.recipeId) === parseInt(recipeId)
    })
    // sort list of steps in order
    const orderedSteps = stepsList.sort((a, b) =>  a.stepNumber - b.stepNumber)
    return (
        <>
            <div className="recipe-list-header">
                <h3><q>Good cookin', good lookin!'</q></h3>
            </div>
            <section className="recipe-container">
            
                <div key={`recipe--${recipe.id}`} className="recipe-div">
                        {/* title */}

                    <h4 className="post-title"> {recipe.name}</h4>
                    {/* ingredient and step lists */}
                    <div className="ingredients-and-steps-container">
                        <div className="ingredients">
                            <h4>Ingredient List:</h4>
                            <ul>
                                {
                                    
                                    list.map(
                                        (ingredient) => { 
                                            
                                            return <li key={`ingredient--${ingredient.id}`}>{ingredient.name} ({ingredient.amount})</li>})
                                    } 
                            </ul>
                        </div>
                        <div className="steps">
                            <h4>Steps:</h4>
                            <ol>
                                {
                                    orderedSteps.map(
                                        (step) => { 
                                            return <li key={`step--${step.id}`}>{step.step} ({step.minutes} min.)</li>})
                                    } 
                            </ol>
                        </div>
                    </div>
                    {/* image */}
                    <section className="image-container">
                        <img className="post-image" src={recipe.photo} alt="Photo of Food" />
                    </section>
                    {/* story */}
                    <section className="story-conatiner">
                        <article className="story">
                        <h3>Story/Memory:</h3>
                        {recipe.memory}
                        </article>
                    </section>
                        <CommentForm
                        setComments = {setComments}
                        comments = {comments}
                        users = {users}
                        setUsers = {setUsers}/>
                        <Comments
                        setComments = {setComments}
                        comments = {comments}
                        users = {users}
                        setUsers = {setUsers}/>
                    </div>
            </section>
        </>
    )
}

