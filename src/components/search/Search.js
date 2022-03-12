import React, { useEffect, useState } from "react";
import { SearchListIngredients } from "./SearchListIngredients";
import { RecipeListSearch } from "./SearchListRecipe";





export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("")
    const [ingredientsSearch, setIngredientsSearch] = useState("")
    const [radios, setRadios] = useState([])
    const [recipeView, setRecipeView] = useState(true)
    
    
    
    const RecipeSearch = () => {

        return (
            <>
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                                
                                type="text"
                                className="form-control"
                                placeholder="Search Recipe..."
                                value={searchInput}
                                onChange={(evt) => {
                                    setSearchInput(evt.target.value)
                                }} />
                        </div>
                    </fieldset>
                    
                </form>
                
            </>
        )
    }
    const IngredientSearch = () => {

        return (
            <>
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                                
                                type="text"
                                className="form-control"
                                placeholder="Search Recipe..."
                                value={ingredientsSearch}
                                onChange={(evt) => {
                                    setIngredientsSearch(evt.target.value)
                                }} />
                        </div>
                    </fieldset>
                    
                </form>
                
            </>
        )
    }
    
    const DropDown = () => {
        return <div className="radio-container">
            <select>
                <option value="recipe" onChange={setRecipeView(true)}>Recipes</option>
                <option value="ingredients" onChange={setRecipeView(false)}>Ingredients</option>
            </select>
        </div>
    }
    
    
    return (
        <>
            <DropDown/>
            {/* <RecipeSearch/> */}
            {/* <SearchListIngredients ingredientsSearch={ingredientsSearch}/> */}
            <RecipeListSearch searchInput={searchInput} />
        </>
        )
}

