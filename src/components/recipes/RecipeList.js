import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./RecipeList.css"
import hollow from "./hollow.svg"
import solid from "./solid.svg"
import { apiDelete, getAllLikes, getAllRatings, getAllRecipesWithSteps, getAllSteps } from "../../ApiManager";
import AOS from 'aos'
import "aos/dist/aos.css"

// create a function that lists out all the recipes in XML
export const RecipeList = () => {
    // create recipe state
    const [recipes, setRecipes] = useState([])
    const [likesArray, setLikes] = useState([])
    const [steps, setSteps] = useState([])
    const [ratings, setRatings] = useState([])
    const [foundMax, setFoundMax] = useState({})
    
// use effect fetches recipes with expanded users from API
    useEffect(
        () => {
            getAllRecipesWithSteps()
                .then((data) => {setRecipes(data)})
                .then(getAllSteps)
                .then((data) => {setSteps(data)})
                .then(getAllLikes)
                .then((data) => {setLikes(data)})
                .then(getAllRatings)
                .then((data) => {setRatings(data)})
        },
        []
    )
    // triggers AOS animations
    useEffect(
        () => {
            AOS.init({
                duration: 2000,
                // disables animation on page break for large screens
                // layout becomes rows instead of a column
                disable: ()=> {
                    const minWidth = 1400
                    return window.innerWidth > minWidth
                }
            })
            AOS.refresh()
        },
        []
    )
    // MEMOIZATION to find top "liked" post
    useEffect(
        () => {
            const likeList = {}
        if (likesArray.length != 0) {
            
            for (const like of likesArray) {
            if (like.recipeId in likeList) {
                likeList[like.recipeId] = likeList[like.recipeId] + 1
            }
            else {
                likeList[like.recipeId] = 1
            }
            
            }
            let foundMax = {
                maxRecipeId: 0,
                maxRecipeCount: 0
            }
            for (let key in likeList) {
                if (likeList[key] > foundMax.maxRecipeCount) {
                    foundMax.maxRecipeId = key
                    foundMax.maxRecipeCount = likeList[key]
                }
            }
            
            setFoundMax(foundMax)
        }
        },
        [likesArray]
    )
    const topLikedRecipe = recipes.find(recipe => recipe.id === parseInt(foundMax.maxRecipeId))

        // function to send new "like" object into API
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
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/likes", fetchOption)
                .then(update)
        
    }

    // unlike recipe sends delete call to api and triggers update for component state
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
                <h3 className="recipe-title">Recipes</h3>
                
                <Link className="most-liked" data-aos="fade" 
                    to={`/recipes/${topLikedRecipe?.id}`} 
                    >Most liked recipe: {topLikedRecipe?.name}
                </Link>
            </div>
            <section className="recipe-container">
            {
                recipes.map(
                    (recipe) => {
                        // get all ratings for recipe, map out ratings in array, find average rating
                        const ratingsObjectArray = ratings.filter(rating => rating.recipeId === recipe.id)
                        const ratingsArray = ratingsObjectArray.map(rating => rating.rating)
                        const initValue = 0
                        const addedRatings = ratingsArray.reduce(
                            (prev, current) => prev + current, initValue
                        )
                        const averageRating = (addedRatings / ratingsArray.length)
                        const roundedRatings = Math.round(averageRating * 10) / 10
                        const foundUserId = parseInt(localStorage.getItem("recipe_user"))
                        // get all steps.time for recipe into array to extract time
                        const stepsArray = steps.filter(step => step.recipeId === recipe.id)
                        const minuteAdder = () => {
                            let aggregatedTime = 0
                            const minuteMap = stepsArray.map(step => step.minutes)
                            // adds all time together
                            const time = minuteMap.reduce( (previousValue, currentValue) => previousValue + currentValue, aggregatedTime)
                            return time
                        }
                        let liked = ``
                        // find if there is a like for this recipe
                        const foundLike = likesArray.find(like => like.recipeId === recipe.id && like.userId === foundUserId )
                        // switches between liked and unliked icons
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
                        // functions for if recipe is rated yet
                        const rated = () => {
                            return <div className="minutes">
                            {roundedRatings} &#9733; </div>
                        }
                        const unrated = () => {
                            return ""
                        }
                        
                        return <div data-aos="fade-up" key={`recipe--${recipe.id}`} className="recipe-div">
                                {/* link to recipe page */}
                                <div className="parent">
                                    <Link className="link-name" data-aos="slide-right" 
                                        to={`/recipes/${recipe.id}`} 
                                        key={`recipe--${recipe.id}`} >
                                    {/* title */}
                                            <h4 className="post-title">
                                            {recipe.name} by {recipe.user.name} 
                                            <div className="bubbles">
                                                <div className="minutes">
                                                    {minuteAdder()} min.
                                                </div>
                                                {averageRating ? rated() : unrated()}
                                            </div>
                                            </h4>
                                    </Link>
                                </div>
                                {/* image */}
                                <div  data-aos="slide-left" className="image-container">
                                    <img  className="post-image"  src={recipe.photo} alt="Food" />
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

