import React, { useContext, useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { DataContext } from "../context/dataContext";
import { toast } from "react-hot-toast";
import { BsFillClockFill } from "react-icons/bs";

const ThanksYou = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const { storage } = useContext(DataContext);
    const [status, setStatus] = useState(null);

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
                    setStatus("success");
                    handleSuccess();
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setStatus("custom");
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setStatus("custom");
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setStatus("error");
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    useEffect(() => {
        if (message) {
            if (status === "success") {
                toast.success(message);
            } else if (status === "error") {
                toast.error(message);
            } else {
                toast((t) => (
                    <span>
                        <BsFillClockFill /> {message}
                    </span>
                ));
            }
        }
    }, [message]);

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
                handleOrderPlace();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleOrderPlace = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/order/create`, {
                storage,
            })
            .then((result) => {
                console.log(result);
                localStorage.removeItem("activeStep");
                localStorage.removeItem("storage");
                localStorage.removeItem("clientSecret");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClean = () => {
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
