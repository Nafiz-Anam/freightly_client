import React, { useEffect, useState } from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import { DataProvider } from "./context/dataContext";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import StepContextProvider from "./context/stepContext";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/checkout";

function App() {
    useEffect(() => {
        if (window.location.pathname === "/") {
            window.location.pathname = "/step1";
        }
    }, []);

    return (
        <Router>
            <StepContextProvider>
                <DataProvider>
                    <Routes>
                        {/* Use the CheckoutLayout for the checkout page */}
                        <Route path="/checkout" element={<Checkout />} />
                        {/* Use the default Layout for other pages */}
                        <Route
                            path="/*"
                            element={
                                <Layout>
                                    <MainPage />
                                </Layout>
                            }
                        />
                    </Routes>
                </DataProvider>
            </StepContextProvider>
        </Router>
    );
}

export default App;
