
import "./Comments.css"
import { useParams } from "react-router"

// function gets comments and users from props
// maps out all comments found for each post
export const Comments = ({comments, users}) => {

    const {recipeId} = useParams()
    const filteredComments = comments.filter(comment => comment.recipeId === parseInt(recipeId))

    return (
        <div className="comment-container">
            {
                filteredComments.map(comment => {
                    const foundUser = users.find(user => user.id === comment.userId)
                    return <div key={comment.id} className="single-comment-container">
                    <div key={`comment--${comment.id}`} className="single-comment"><h4 className="commenter">{foundUser?.name} said:</h4> {comment.comment}</div>
                    </div> 
                }
                )
            }
        </div>
    )
}

