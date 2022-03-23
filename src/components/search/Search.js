import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SearchListIngredients } from "./SearchListIngredients";
import { RecipeListSearch } from "./SearchListRecipe";
import "./Search.css"


export const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")
    // sets search view state to recipes by default
    const [recipeView, setRecipeView] = useState(true)
    // set up state options for search view between recipe name and ingredients
    const items =[
        {label: "Recipes", value: "recipes", hasValue: true},
        {label: "Ingredients", value: "ingredients", hasValue: false},
    ]
    // outputs a search bar input field and drop down to toggle search views
    const RecipeSearch = () => {

        return (
            <>
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                                type="text"
                                className="search-control"
                                placeholder="Search here..."
                                key="recipe-search"
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
    const setView = (e) => {
        if (recipeView !== parseInt(e.hasValue)) {
            setRecipeView(e.hasValue)
        } 
    }
    
    const DropDown = () => {
        return <div className="selector">
            <Select options={items} value={items.value} onChange={setView}/>
        </div>
    }
    // returns search components and sets which view user sees
    return (
        <>
            <div className="search-container">
                <DropDown/>
                <RecipeSearch />
            </div>
            {
                recipeView ? 
                <RecipeListSearch searchInput={searchInput} /> 
                : 
                <SearchListIngredients searchInput={searchInput}/>
            }
        </>
        )
}

