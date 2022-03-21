


export const getAllComments = () => {
    return fetch(`https://deedees-api-qdte8.ondigitalocean.app/comments?_expand=user`)
        .then(res => res.json())
}

export const getAllSteps = () => {
    return fetch(`https://deedees-api-qdte8.ondigitalocean.app/steps`)
        .then(res => res.json())
}
export const getAllIngredients = () => {
    return fetch(`https://deedees-api-qdte8.ondigitalocean.app/ingredients`)
        .then(res => res.json())
}
export const getUserRecipe = (id) => {
    return fetch(`https://deedees-api-qdte8.ondigitalocean.app/recipes/${id}?_expand=user`)
        .then(res => res.json())
}
export const getAllRecipes = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/recipes?_expand=user")
        .then(res => res.json())
}
export const getAllRecipesWithSteps = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/recipes?_expand=user&_embed=steps")
        .then(res => res.json())
}
export const getAllLikes = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/likes?_expand=user")
        .then(res => res.json())
}
export const getAllForkedIngredients = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedIngredients")
        .then(res => res.json())
}
export const getAllForkedSteps = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedSteps")
        .then(res => res.json())
}
export const getAllForkedRecipes = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/forkedRecipes")
        .then(res => res.json())
}
export const getAllUsers = () => {
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/users")
        .then(res => res.json())
}
export const apiDelete = (id) => {
    return fetch(`https://deedees-api-qdte8.ondigitalocean.app/likes/${id}`, {
        method: "DELETE"
    })
}

export const saveSteps = (step) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(step)
        }
        return fetch("https://deedees-api-qdte8.ondigitalocean.app/steps", fetchOption)
        
    }

// save ingredients
export const saveIngredients = (ingredient) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(ingredient)
    }
    return fetch("https://deedees-api-qdte8.ondigitalocean.app/ingredients", fetchOption)
        
    }

