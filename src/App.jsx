import React, { useState } from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import { DataProvider } from "./context/dataContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const cartSummary = [
        { name: "Item 1", price: "$10" },
        { name: "Item 2", price: "$20" },
        // Add more items here
    ];

    const [activeStep, setActiveStep] = useState(1);

    const handleNext = (step) => {
        setActiveStep(activeStep + step);
    };

    return (
        <Router>
            <DataProvider>
                <Layout
                    cartSummary={cartSummary}
                    totalPrice="$30"
                    activeStep={activeStep}
                    onNext={handleNext}
                >
                    <MainPage activeStep={activeStep} onNext={handleNext} />
                </Layout>
            </DataProvider>
        </Router>
    );
}

export default App;
