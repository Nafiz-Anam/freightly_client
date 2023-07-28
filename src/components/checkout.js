import React, { useContext, useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_ID);

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    // console.log("location.search =>", location.search);

    useEffect(() => {
        if (location.search) {
            const queryParams = new URLSearchParams(location.search);
            const { clientSecret: clientSecret = "" } =
                Object.fromEntries(queryParams);
            setClientSecret(clientSecret);
            setIsLoading(false);
            console.log(clientSecret);
            clearURL(location.pathname);
        }
    }, [location.search]);
    const clearURL = (path) => {
        window.history.replaceState({}, document.title, path);
    };

    useEffect(() => {
        localStorage.setItem("clientSecret", clientSecret);
    }, [clientSecret]);

    const options = {
        clientSecret,
    };

    return (
        <>
            {!isLoading && clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <div className="text-center checkout">
                    <Spinner animation="border" />
                </div>
            )}
        </>
    );
};

export default Checkout;
