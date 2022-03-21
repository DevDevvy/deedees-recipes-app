

export const ForkedIngredients = ({ingredients, setIngredients, handleDeleteFieldsIngredients}) => {

    return <>
    {ingredients.map((ingr, index) => (
    <div className="ingredients-inner-container" key={index}>
        <input
            required
            type="text"
            // key passed in to object will be "name"
            name="name"
            // makes value passed into object equal to current state
            value={ingredients[index].name}
            className="ingredient"
            placeholder={`Ingredient ${index + 1}`}
            id={`Ingredient${index + 1}`}
            // listens for state change
            onChange={(evt) => {
            // copy state
                const copy = [...ingredients];
                copy[index].name = evt.target.value;
                setIngredients(copy);
            }}
        />
        { /* amount of ingredient */}
        <input
            required
            type="text"
            className="amount"
            // so key passed into object will be "amount"
            placeholder="Amount"
            name="amount"
            // makes value passed into object equal to current state
            value={ingredients[index].amount}
            id="amount1"
            // listens for state change
            onChange={(evt) => {
            // copy state
                const copy = [...ingredients];
                copy[index].amount = evt.target.value;
                setIngredients(copy);
            }}
        />
        <button
                        className="delete-step"
                        onClick={(event) => handleDeleteFieldsIngredients(event)}
                    >-
                    </button>
    </div>
    
    ))}
    </>
}
