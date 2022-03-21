import { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./CommentForm.css"
import { useHistory } from "react-router"
import { getAllComments } from "../../ApiManager"

// function outputs the comment form, takes prop to set comments
export const CommentForm = ({setComments}) => {
    const history = useHistory()
    const {recipeId} = useParams()
    const [comment, setComment] = useState({
        comment: "",
        userId: null,
        recipeId: null
    })
    
    const sendComment = () => {
        const commentObject = {
            userId: parseInt(localStorage.getItem("recipe_user")),
            comment: comment.comment,
            recipeId: parseInt(recipeId)
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(commentObject)
        }
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/comments", fetchOption)
        // clear the comment after sent to API
        .then(clearComment())
    }
    // clear comment, and update state
    const clearComment = () => {
        const copy = {...comment}
        copy.comment = ""
        setComment(copy)
        update()
    }
    // updates comments state
    const update = () => {
        getAllComments()
            .then((data) => {
                setComments(data)
            })
    }
    return (
        <article className="comment-form">
            <h3>Comments</h3>
            <textarea
                        required
                        type="text"
                        className="comment"
                        placeholder="Comment here..."
                        value={comment.comment}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...comment}
                                // modify copy of state with user input value
                                copy.comment = evt.target.value
                                // update state with new state
                                setComment(copy)
                            }
                        } />
                    <button className="send-comment" onClick={sendComment}>Send Comment</button>
        </article>
    )
}