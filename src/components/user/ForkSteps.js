
export const ForkedSteps = ({steps, setSteps}) => {
    
    return <>
    {steps.map((stp, index) => {
                return (
                    <div className="step-container" key={index}>
                    {/* minutes */}
                    <input
                        required 
                        type="number"
                        step="0.1"
                        className="number"
                        value={steps[index].minutes}
                        // listens for state change
                        onChange={
                            (evt) => {
                                const copy = [...steps]
                                    
                                    copy[index].minutes = parseFloat(evt.target.value)
                                    setSteps(copy)
                                }
                            }
                        />
                        {/* step */}
                        <input
                        required 
                        type="text"
                        className="step"
                        value={steps[index].step}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = [...steps]
                                    
                                    copy[index].step = evt.target.value
                                    setSteps(copy)
                                }
                                
                            }
                        />
                    
                </div>
                );
            })
        }
    </>
}