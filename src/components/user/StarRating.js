import React from "react";
import { useState, useEffect } from "react";
import "./StarRating.css"
import { useParams } from "react-router";

export const StarRating = () => {
    const recipeId = useParams()
    const [userRating, setRating] = useState({});
    const userId = parseInt(localStorage.getItem("recipe_user"))
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${userId}?_embed=rating`)
                .then(res => res.json())
                .then((data) => {
                    // break down into smaller steps
                    const ratingArray = data.rating
                    const id = parseInt(recipeId.recipeId)
                    const foundRating = ratingArray?.find(rate => rate.recipeId === id)
                    
                    setRating(foundRating)
                    })
            },
        []
    )
    
    const update = () => {
        fetch(`http://localhost:8088/users/${userId}?_embed=rating`)
            .then(res => res.json())
            .then((data) => {
                // break down into smaller steps
                const ratingArray = data.rating
                const id = parseInt(recipeId.recipeId)
                const foundRating = ratingArray?.find(rate => rate.recipeId === id)
                
                setRating(foundRating)
                }
            )
    }
    // API calls for rating system when rating button pushed
    const sendStarRating = (ratingNumber) => {
        // check if user has a rating, if not- POST new object
        if (!userRating) {
            const newRating = {
                recipeId: parseInt(recipeId.recipeId),
                rating: ratingNumber,
                userId: userId
            }
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newRating)
            }
            return fetch("http://localhost:8088/rating", fetchOption)
                .then(update)
        } else {
            // if rating object is found, use PUT to change object rating value
            const newRating = {
                recipeId: parseInt(recipeId.recipeId),
                rating: ratingNumber,
                userId: userId
            }
            const id = userRating.id
            const fetchOption = {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newRating)
            }
            return fetch(`http://localhost:8088/rating/${id}`, fetchOption)
                .then(update)
        }
    }
    

    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
            <button
                id="star-buttons"
                type="button"
                key={index}
                className={index <= userRating?.rating ? "on" : "off"}
                onClick={() => sendStarRating(index)}>
                <span className="star">&#9733;</span>
            </button>
            );
        })}
        </div>
    );
};