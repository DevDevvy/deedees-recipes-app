import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getAllForkedIngredients, getAllForkedRecipes, getAllForkedSteps } from "../../ApiManager"

// finds all forked recipes that are related to current recipe
export const ForkedRecipeList = ({users}) => {
    const [forkedRecipes, setForkedRecipes] = useState([])
    const [forkedIngredients, setForkedIngredients] = useState([])
    const [forkedSteps, setForkedSteps] = useState([])
    const {recipeId} = useParams()

    useEffect(
        () => {
            getAllForkedRecipes()
                .then((data) => {setForkedRecipes(data)})
                .then(getAllForkedIngredients)
                .then((data) => {setForkedIngredients(data)})
                .then(getAllForkedSteps)
                .then((data) => {setForkedSteps(data)})
        },
        []
    )
// map out all forked recipes
// filter all steps and ingredients for recipe
// find name of user of post
// build post with steps, ingredients, photo, user name, story
    return <article className="forked-recipe-list-container">
            
        {
            forkedRecipes.map(recipe => {
                if (recipe.forkedFromId === parseInt(recipeId)) {
                    
                // filter all steps for recipe
                const foundSteps = forkedSteps.filter(step => step.recipeId === recipe.id)
                // filter ingredients for recipe
                const foundIngredients = forkedIngredients.filter(ingredient => ingredient.recipeId === recipe.id)
                // find user for post
                const foundUser = users?.find(user => user.id === recipe.userId)
                // put steps list in order for final output
                const orderedSteps = foundSteps.sort((a, b) =>  a.stepNumber - b.stepNumber)
                return <div key={`recipe--${recipe.id}`} className="recipe-div">
                        <h2>Forked Recipes</h2>
                        {/* title */}
                        <h4 className="post-title"> {recipe.name} by {foundUser?.name}</h4>
                        {/* ingredient and step lists */}
                               {/* story */}
                            <section className="story-conatiner">
                                <article className="story">
                                    <h3>Memory/Message:</h3>
                                    {recipe.memory}
                                </article>
                            </section>
                        <div className="ingredients-and-steps-container">
                            <div className="ingredients">
                                <h4>Ingredient List:</h4>
                                <ul>
                                    {
                                        
                                        foundIngredients.map(
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
                </div>
                }
            })
        }
    </article>



}