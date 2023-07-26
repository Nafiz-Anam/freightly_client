import React, { useEffect, useState } from "react";
import Layout from "./layout/main_layout";
import MainPage from "./pages/MainPage";
import { DataProvider } from "./context/dataContext";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import StepContextProvider from "./context/stepContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
    "pk_test_51NY3V5FurZ1eGDKkZOZ1jdyT4mBCAUQJ07KbgQuPCoOszdjFLErWRHTdZ7jyLe3SFXVj7u5XzE1i3MjLcg80eo39007tdj4Bpr"
);

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
                <Elements stripe={stripePromise} options={options}>
                    <DataProvider>
                        <Layout>
                            <MainPage />
                        </Layout>
                    </DataProvider>
                </Elements>
            </StepContextProvider>
        </Router>
    );
}

export default App;
