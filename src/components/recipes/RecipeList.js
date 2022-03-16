import React, { useState, useEffect } from "react";
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import "./RecipeList.css"
import hollow from "./hollow.svg"
import solid from "./solid.svg"
import { apiDelete, getAllLikes, getAllRecipesWithSteps } from "../../ApiManager";

import AOS from 'aos'
import "aos/dist/aos.css"

// create a function that lists out all the recipes in XML
export const RecipeList = () => {
    

    // create recipe state
    const [recipes, setRecipes] = useState([])
    const [likesArray, setLikes] = useState([])
    const history = useHistory()

// use effect fetches recipes with expanded users from API
    useEffect(
        () => {
            getAllRecipesWithSteps()
                .then((data) => {
                    // set recipe state with data from API
                    setRecipes(data)
                })
        },
        []
    )
    useEffect(
        () => {
            getAllLikes()
                .then((data) => {
                    // set recipe state with data from API
                    setLikes(data)
                })
        },
        []
    )

    useEffect(
        () => {
            AOS.init({duration: 2000})
            AOS.refresh()
        },
        []
    )
        // function to send new like object into API
    const likeRecipe = (id) => {
        // make new like object
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
        return fetch("http://localhost:8088/likes", fetchOption)
                .then(res => res.json())
                .then((data) => {
                    // set recipe state with data from API
                    update()
                })
        
    }

    // unlike recipe
    const unlikeRecipe = (id) => {
        apiDelete(id)
        .then(update)
    }
    // update "likes" state
    const update = () => {
        getAllLikes()
            .then((data) => {
                setLikes(data)
            })
    }

    return (
        <>
        <section className="main-container">
            <div className="recipe-list-header">
                <h3>Recipes</h3>
            </div>
            <section className="recipe-container">
            {
                recipes.map(
                    (recipe) => {
                        const foundUserId = parseInt(localStorage.getItem("recipe_user"))
                        let liked = ``
                        // find if there is a like for this recipe
                        
                        const foundLike = likesArray.find(like => like.recipeId === recipe.id && like.userId === foundUserId )
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
                        
                        return <div data-aos="fade-up" key={`recipe--${recipe.id}`} className="recipe-div">
                                {/* link to recipe page */}
                                <Link data-aos="slide-right" to={`/recipes/${recipe.id}`} key={`recipe--${recipe.id}`} >
                                    {/* title */}
                                <h4 className="post-title">{recipe.name} by {recipe.user.name}</h4></Link>
                                {/* image */}
                                <div  data-aos="slide-left" className="image-container">
                                    <img  className="post-image"  src={recipe.photo} alt="Photo of Food" />
                                </div>
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
                    )
                }
                </section>
            </section>
        </>
    )
}

