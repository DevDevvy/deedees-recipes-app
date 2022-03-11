import React, { useEffect, useState } from "react";
import { RecipeListSearch } from "./SearchListRecipe";





export const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("")
    // const [ingredientsSearch, setIngredientsSearch] = useState("")
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
    // const IngredientSearch = () => {

    //     return (
    //         <>
    //             <form className="SearchBar">
    //                 <fieldset>
    //                     <div className="form-group">
                            
    //                         <input
                                
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Search Recipe..."
    //                             value={ingredientsSearch}
    //                             onChange={(evt) => {
    //                                 setIngredientsSearch(evt.target.value)
    //                             }} />
    //                     </div>
    //                 </fieldset>
                    
    //             </form>
                
    //         </>
    //     )
    // }
    
    
    return (
        <>
            <RecipeSearch/>
            {/* <IngredientSearch ingredientsSearch = {ingredientsSearch} /> */}
            <RecipeListSearch searchInput={searchInput} />
        </>
        )
}

