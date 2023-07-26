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
    const [clientSec, setClientSec] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/payment/make_payment")
            .then((result) => {
                console.log(result);
                setClientSec(result.data.client_secret);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let options = {
        clientSecret:
            "pi_3NYEUsFurZ1eGDKk1ejEYvBF_secret_fmj2VO24bHRhQx3HgWOM1t2ls",
    };

    // let options = {};
    // useEffect(() => {
    //     options = {
    //         clientSecret:
    //             "pi_3NY7EfFurZ1eGDKk0uaMWh1u_secret_2kbP3I289zCeBbAK7yjWHqdJN",
    //     };
    // }, [clientSec]);

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
