import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hollow from "../recipes/hollow.svg"
import solid from "../recipes/solid.svg"
import { getAllLikes, getAllRecipes } from "../../ApiManager";

export const RecipeListSearch = (props) => {
    const [recipes, setRecipes] = useState([])
    const [likesArray, setLikes] = useState([])


    useEffect(
        () => {
            getAllRecipes()
                .then((data) => {setRecipes(data)})
                .then(getAllLikes)
                .then((data) => {setLikes(data)})
            },
        []
    )
    // function to send new "like" object into API
    const likeRecipe = (id) => {
        const newLike = {
            recipeId: id,
            userId: parseInt(localStorage.getItem("recipe_user")),
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newLike)
        }
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/likes", fetchOption)
                .then(res => res.json())
                .then(update)
        
    }


    const unlikeRecipe = (id) => {
        fetch(`https://deedees-api-qdte8.ondigitalocean.app/likes/${id}`, {
            method: "DELETE"
        })
        .then(update)
    }
    // updates state to show new like
    const update = () => {
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/likes?_expand=user")
            .then(res => res.json())
            .then((data) => {
                setLikes(data)
            })
    }
    return (
        <>
        <section className="main-container">
            <div className="recipe-list-header">
                <h3>Search Recipes</h3>
            </div>
        <section className="recipe-container">
            { 
                recipes.map(
                    (recipe) => {
                        const foundUserId = parseInt(localStorage.getItem("recipe_user"))
                        let liked = ``
                        // find if there is a like for this recipe
                        const foundLike = likesArray.find(like => like.recipeId === recipe.id && like.userId === foundUserId )
                        const itemName = recipe.name.toLowerCase()
                        const inputLower = props.searchInput.toLowerCase()
                        
                        // switches between liked and unliked images
                        if (foundLike !== undefined) {
                            liked = 
                            <img className="favorite-button" 
                                id={`unfavorite--${recipe.id}`} 
                                src={solid} alt="solid heart"
                                onClick={()=> unlikeRecipe(foundLike.id)}/>
                        } else {
                            liked = 
                            <img className="favorite-button" 
                                id={`favorite--${recipe.id}`} 
                                src={hollow} alt="hollow heart"
                                onClick={()=> likeRecipe(recipe.id)}/>
                        }
                        if (itemName.includes(inputLower)) {
                        return <div key={`recipe--${recipe.id}`} className="recipe-div">
                                {/* link to recipe page */}
                                <Link to={`/recipes/${recipe.id}`} key={`recipe--${recipe.id}`} >
                                    {/* title */}
                                <h4 className="post-title">{recipe.name} by {recipe.user.name}</h4></Link>
                                {/* image */}
                                <section className="image-container">
                                    <img className="post-image" src={recipe.photo} alt="Photo of Food" />
                                </section>
                                {/* story */}
                                <section className="story-conatiner">
                                    <article className="story">
                                        <h3>Story/Memory:</h3>
                                        {recipe.memory}
                                        <div className="postButtons">
                                            <div id="favoriteButton">
                                                {liked}
                                            </div>
                                        </div>
                                    </article>
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