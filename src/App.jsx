import React from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import { DataProvider } from "./context/dataContext";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import StepContextProvider from "./context/stepContext";

function App() {
    const cartSummary = [
        { name: "Item 1", price: "$10" },
        { name: "Item 2", price: "$20" },
        // Add more items here
    ];

    return (
        <Router>
            <StepContextProvider>
                <DataProvider>
                    <Layout cartSummary={cartSummary} totalPrice="$30">
                        <MainPage />
                    </Layout>
                </DataProvider>
            </StepContextProvider>
        </Router>
    );
}

export default App;
