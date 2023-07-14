import React, { createContext, useState, useEffect } from "react";

export const StepContext = createContext();

const StepContextProvider = (props) => {
    const storedStep = localStorage.getItem("activeStep");
    const [activeStep, setActiveStep] = useState(
        storedStep ? parseInt(storedStep) : 1
    );

    useEffect(() => {
        localStorage.setItem("activeStep", activeStep.toString());
    }, [activeStep]);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <StepContext.Provider value={{ activeStep, handleStepChange }}>
            {props.children}
        </StepContext.Provider>
    );
};

export default StepContextProvider;
