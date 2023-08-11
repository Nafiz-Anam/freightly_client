import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import ThanksYou from "../components/thankYou";
import { Spinner } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_ID);

const ThankYouPage = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        setClientSecret(localStorage.getItem("clientSecret"));
    }, []);

    const options = {
        clientSecret,
    };

    return (
        <>
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <ThanksYou />
                </Elements>
            ) : (
                <div className="text-center checkout">
                    <Spinner animation="border" />
                </div>
            )}
        </>
    );
};

export default ThankYouPage;
