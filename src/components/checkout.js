import React, { useContext, useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_ID);

const Checkout = () => {
    const { storage } = useContext(DataContext);
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    let orderData = {
        total_price: storage.total_price,
    };

    let makePayment = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/payment/create`, {
                orderData,
            })
            .then((result) => {
                console.log(result);
                setClientSecret(result.data.clientSecret);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        makePayment();
    }, []);

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
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
        </>
    );
};

export default Checkout;
