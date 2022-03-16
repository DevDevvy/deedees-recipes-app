


export const getAllComments = () => {
    return fetch(`http://localhost:8088/comments?_expand=user`)
        .then(res => res.json())
}

export const getAllSteps = () => {
    return fetch(`http://localhost:8088/steps`)
        .then(res => res.json())
}
export const getAllIngredients = () => {
    return fetch(`http://localhost:8088/ingredients`)
        .then(res => res.json())
}
export const getUserRecipe = (id) => {
    return fetch(`http://localhost:8088/recipes/${id}?_expand=user`)
        .then(res => res.json())
}
export const getAllRecipes = () => {
    return fetch("http://localhost:8088/recipes?_expand=user")
        .then(res => res.json())
}
export const getAllRecipesWithSteps = () => {
    return fetch("http://localhost:8088/recipes?_expand=user&_embed=steps")
        .then(res => res.json())
}
export const getAllLikes = () => {
    return fetch("http://localhost:8088/likes?_expand=user")
        .then(res => res.json())
}

export const getAllForkedIngredients = () => {
    return fetch("http://localhost:8088/forkedIngredients")
        .then(res => res.json())
}
export const getAllForkedSteps = () => {
    return fetch("http://localhost:8088/forkedSteps")
        .then(res => res.json())
}
export const getAllForkedRecipes = () => {
    return fetch("http://localhost:8088/forkedRecipes")
        .then(res => res.json())
}
export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}
export const apiDelete = (id) => {
    return fetch(`http://localhost:8088/likes/${id}`, {
        method: "DELETE"
    })
}