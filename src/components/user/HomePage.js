import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useHistory } from "react-router"
import "./HomePage.css"
import { Link } from "react-router-dom"

export const HomePage = () => {

    // set state for user likes and recipes and get user ID
    const [likes, setLikes] = useState([])
    const [userRecipes, setUserRecipes] = useState([])
    const userId = parseInt(localStorage.getItem("recipe_user"))

    const history = useHistory()
    const {recipeId} = useParams()
    // get likes with expanded user and recipe
    useEffect(
        () => {
            fetch(`http://localhost:8088/likes?userId=${userId}&_expand=recipe`)
                .then(res => res.json())
                .then((data) => {
                    // set recipe state with data from API
                    setLikes(data)
                })
        },
        []
    )
    // get all recipes for specific user using ID
    useEffect(
        () => {
            
            fetch(`http://localhost:8088/recipes?userId=${userId}`)
                .then(res => res.json())
                .then((data) => {
                    // set recipe state with data from API
                    setUserRecipes(data)
                })
        },
        []
    )
    const deleteRecipe = (id) => {
        fetch(`http://localhost:8088/recipes/${id}`, {
            method: "DELETE"
        })
        .then(update)
    }
    const update = () => {
        return fetch(`http://localhost:8088/recipes?userId=${userId}`)
            .then(r => r.json())
            .then((data) => {
                setUserRecipes(data)
            })
    }
    
    return <article className="home-page-container"> 
        
        <h2 className="home-page-title">VITTLES</h2>
        <article className="favorites-and-recipes">
            <section className="favorites-container">
                <h4 className="fave">FAVORITES</h4>
                <div className="favorite-buttons-container">
                    {/* map of likes */}
                    {
                        likes.map((like) => {
                            return <Link key={like.id} to={`recipes/${like.recipe.id}`} ><p className="likes">{like.recipe.name}</p></Link>
                        })
                    }
                </div>
            </section>
            <section className="recipes-container">
                <h4 className="recipes-title">MY RECIPES</h4>
                
                    {/* map of user recipes */}
                    {
                        userRecipes.map((recipe) => {
                            return (<div className="recipes-edit" key={recipe.id}>
                            <Link key={`recipe-${recipe.id}`} to={`recipes/${recipe.id}`} className="my-recipes">{recipe.name}</Link>
                            <div className="buttons-container" key={`buttons--${recipe.id}`} >
                                <button className="edit" key={`button--${recipe.id}`} onClick={()=> history.push(`/edit/${recipe.id}`)}>Edit</button>
                                <button className="delete" key={`delete-button--${recipe.id}`} onClick={()=>deleteRecipe(recipe.id)}>Delete</button>
                            </div>
                            </div>
                            )
                        })
                    }
                
            </section>
        </article>
    </article>
}