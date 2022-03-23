import React from "react";
import { useState, useEffect } from "react";
import "./StarRating.css"
import { useParams } from "react-router";
import { getUsersRatings } from "../../ApiManager";


export const StarRating = () => {
    const recipeId = useParams()
    const [userRating, setRating] = useState({});
    const userId = parseInt(localStorage.getItem("recipe_user"))
    
    useEffect(
        () => {
            getUsersRatings(userId)
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
        getUsersRatings(userId)
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
            return fetch("https://deedees-api-qdte8.ondigitalocean.app/rating", fetchOption)
                .then(update)
        } else {
            // if rating object is found, use PUT to change object rating value
            
            
            userRating.rating = ratingNumber
            const id = userRating.id
            const fetchOption = {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(userRating)
            }
            return fetch(`https://deedees-api-qdte8.ondigitalocean.app/rating/${id}`, fetchOption)
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