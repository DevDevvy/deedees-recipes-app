import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SearchListIngredients } from "./SearchListIngredients";
import { RecipeListSearch } from "./SearchListRecipe";
import "./Search.css"




export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("")
    const [recipeView, setRecipeView] = useState(true)

    const items =[
        {label: "Recipes", value: "recipes", hasValue: true},
        {label: "Ingredients", value: "ingredients", hasValue: false},
    ]

    const RecipeSearch = () => {

        return (
            <>
            
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                                autoFocus
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
        // debugger
        if (recipeView !== parseInt(e.hasValue)) {
            setRecipeView(e.hasValue)
        } 
    }
    
    const DropDown = () => {
        
        return <div className="selector">
            <Select options={items} value={items.value} onChange={setView}/>
        </div>
    }
    return (
        <>
            <div className="search-container">
            <DropDown/>
            <RecipeSearch />
            </div>
            {/* <SearchListIngredients searchInput={searchInput}/> */}
            {
                recipeView ? 
                <RecipeListSearch searchInput={searchInput} /> 
                : 
                <SearchListIngredients searchInput={searchInput}/>
            }
            {/* <RecipeListSearch searchInput={searchInput} /> */}
        </>
        )
}

