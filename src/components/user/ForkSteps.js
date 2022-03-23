

export const ForkedSteps = ({steps, setSteps, handleDeleteFieldsSteps}) => {


    return <>
    {steps.map((stp, index) => {
                return (
                    <div className="step-container" key={index}>
                    {/* minutes */}
                    <input
                        required
                        type="number"
                        className="number"
                        placeholder="Minutes"
                        value={steps[index].minutes}
                    // listens for state change
                        onChange={(evt) => {
                            const copy = [...steps];
                            copy[index].minutes = parseFloat(evt.target.value);
                            setSteps(copy);
                        }}
                    />
                    {/* step */}
                    <input
                        required
                        type="text"
                        className="step"
                        placeholder="Step"
                        value={steps[index].step}
                        onChange={(evt) => {
                            const copy = [...steps];
                            copy[index].step = evt.target.value;
                            copy.stepNumber = index + 1
                            setSteps(copy);
                        }}
                    />
                    <div className="button-container">
                        <button
                            className="delete-step"
                            onClick={(e, index) => handleDeleteFieldsSteps(e, index)}
                            >-</button>
                    </div>
                </div>
                );
            })
        }
    </>
}