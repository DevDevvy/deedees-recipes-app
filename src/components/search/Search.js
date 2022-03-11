import React, { useEffect, useState } from "react";
import { RecipeListSearch } from "./SearchListRecipe";





export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("")
    
    const RecipeSearch = () => {

        return (
            <>
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                                required autoFocus
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
    
    
    
    return (
        <>
            <RecipeSearch/>
            <RecipeListSearch searchInput={searchInput} />
        </>
        )
}

