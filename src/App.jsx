import React from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import "./App.css";

function App() {
    const cartSummary = [
        { name: "Item 1", price: "$10" },
        { name: "Item 2", price: "$20" },
        // Add more items here
    ];

    const handleNext = () => {
        // Handle next button click
    };

    return (
        <Layout
            logo="Logo"
            cartSummary={cartSummary}
            totalPrice="$30"
            onNext={handleNext}
        >
            <MainPage />
        </Layout>
    );
}

export default App;
