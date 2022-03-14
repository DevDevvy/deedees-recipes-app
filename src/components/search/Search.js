import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SearchListIngredients } from "./SearchListIngredients";
import { RecipeListSearch } from "./SearchListRecipe";
import "./Search.css"




export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("")
    const [recipeView, setRecipeView] = useState(true)

    const items =[
        {label: "Recipes", value: "recipes"},
        {label: "Ingredients", value: "ingredients"},
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


    
    const DropDown = () => {
        
        return <div className="selector">
            <Select options={items} onChange={()=>setRecipeView(!recipeView)}/>
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

