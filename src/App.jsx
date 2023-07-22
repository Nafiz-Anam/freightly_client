import React, { useEffect } from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import { DataProvider } from "./context/dataContext";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import StepContextProvider from "./context/stepContext";

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
                    <Layout>
                        <MainPage />
                    </Layout>
                </DataProvider>
            </StepContextProvider>
        </Router>
    );
}

export default App;
