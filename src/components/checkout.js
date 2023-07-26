import React, { useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51NY3V5FurZ1eGDKkZOZ1jdyT4mBCAUQJ07KbgQuPCoOszdjFLErWRHTdZ7jyLe3SFXVj7u5XzE1i3MjLcg80eo39007tdj4Bpr"
);

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/payment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const options = {
        clientSecret,
    };

    return (
        <>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default Checkout;
