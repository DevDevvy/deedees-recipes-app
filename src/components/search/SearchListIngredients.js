import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllIngredients, getAllRecipes } from "../../ApiManager";

// sets search view for ingredints
export const SearchListIngredients = (props) => {
    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])

    useEffect(
        () => {
            getAllRecipes()
                .then((data) => {setRecipes(data)})
                .then(getAllIngredients)
                .then((data) => {setIngredients(data)})
            },
        []
    )


    return (
        <>
        <section className="main-container">
            <div className="recipe-list-header">
                <h3>Search Ingredient</h3>
            </div>
            <section className="recipe-container">
            { 
                ingredients.map(
                    (ingredient) => {
                        // set ingredient name to lower case to make it more searchable
                        // take input from props and set to lower case for search
                        const name = ingredient.name.toLowerCase()
                        const inputLower = props.searchInput.toLowerCase()
                        // find recipe for each ingredient found
                        const foundRecipe = recipes.find(recipe => recipe.id === ingredient.recipeId)
                        // filters out all ingredients found for the recipe found
                        const ingredientArray = ingredients.filter(ingredient => ingredient.recipeId === foundRecipe.id)
                        
                        if (name.includes(inputLower)) {
                            return <div key={`ingredient--${ingredient.id}`} className="recipe-div">
                                    {/* link to whole recipe */}
                                    <Link to={`/recipes/${foundRecipe.id}`} key={`ingredient--${ingredient.id}`} >
                                        {/* title */}
                                    <h4 className="post-title">{foundRecipe.name}</h4></Link>
                                    <h5>Your search found:"{ingredient.name}"</h5>
                                    <ul>
                                    {/* all ingredients for recipe */}
                                    {ingredientArray.map(ingredient => {
                                        return <li key={ingredient.id}>{ingredient.name} ({ingredient.amount})</li>
                                    })}
                                    </ul>
                                    {/* image */}
                                    <section className="image-container">
                                        <img className="post-image" src={foundRecipe.photo} alt="Photo of Food" />
                                    </section>
                                    
                                </div>
                            } 
                        }

                        
                    
                    )
                }
                </section>
            </section>
        </>
    )
}