import React, { useContext, useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { DataContext } from "../context/dataContext";

const ThanksYou = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const { storage } = useContext(DataContext);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    handleSuccess();
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    let emailData = {
        email: storage.delivery_contact.email,
    };

    const handleSuccess = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/payment/mail`, {
                emailData,
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClean = () => {
        localStorage.removeItem("activeStep");
        localStorage.removeItem("storage");
        window.location.href = "https://freightly.nl/";
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1>
                Thanks You for the Order.
                <br />
                You will be contacted shorty.
            </h1>
            <div>
                <button className="web-btn" onClick={handleClean}>
                    Go to Website
                </button>
            </div>
        </div>
    );
};

export default ThanksYou;
