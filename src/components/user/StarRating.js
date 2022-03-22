import React from "react";
import { useState, useEffect } from "react";
import "./StarRating.css"
import { useParams } from "react-router";

export const StarRating = ({users}) => {
    const recipeId = useParams()
    const [rating, setRating] = useState(0);
    const [ratings, setRatings] = useState([])
    const userId = parseInt(localStorage.getItem("recipe_user"))
    

    useEffect(
        () => {
            fetch(`https://deedees-api-qdte8.ondigitalocean.app/rating?userId=${userId}`)
                .then(res => res.json())
                .then((data) => {setRating(data[0]?.rating)})
            },
        [userId]
    )
    useEffect(
        () => {
            fetch(`https://deedees-api-qdte8.ondigitalocean.app/rating`)
                .then(res => res.json())
                .then((data) => {setRatings(data)})
            },
        []
    )
    
    
    // debugger
    const sendStarRating = (ratingNumber) => {
        // check if there is a rating object associated with user...
        const foundRating = ratings.find(rating => rating.userId === userId)
        // if not, make a new rating object to send to api
        if (!foundRating) {
            // make new rating object
            const newRating = {
                
                recipeId: parseInt(recipeId.recipeId),
                rating: ratingNumber,
                userId: userId
            }
            debugger
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newRating)
            }
            return fetch("https://deedees-api-qdte8.ondigitalocean.app/rating", fetchOption)
                .then((data) => {setRating(ratingNumber)})
        } else {
            // if rating object is found, use PUT to change object values
            const copy = foundRating
            copy.rating = ratingNumber
            const id = foundRating.id
            const fetchOption = {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(copy)
            }
            return fetch(`https://deedees-api-qdte8.ondigitalocean.app/rating/${id}`, fetchOption)
                .then((data) => {setRating(ratingNumber)})
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
                className={index <= rating ? "on" : "off"}
                onClick={() => sendStarRating(index)}>
                <span className="star">&#9733;</span>
            </button>
            );
        })}
        </div>
    );
};