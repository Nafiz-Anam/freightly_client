import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // const clientSecret = new URLSearchParams(window.location.search).get(
        //     "payment_intent_client_secret"
        // );

        // if (!clientSecret) {
        //     return;
        // }

        // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        //     switch (paymentIntent.status) {
        //         case "succeeded":
        //             setMessage("Payment succeeded!");
        //             break;
        //         case "processing":
        //             setMessage("Your payment is processing.");
        //             break;
        //         case "requires_payment_method":
        //             setMessage(
        //                 "Your payment was not successful, please try again."
        //             );
        //             break;
        //         default:
        //             setMessage("Something went wrong.");
        //             break;
        //     }
        // });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.REACT_APP_CLIENT_URL}/thankyou`,
            },
        });
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    };

    const options = {
        layout: {
            type: "tabs",
            // type: "accordion",
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: true,
        },
    };

    return (
        <div className="payment_container">
            <form id="payment-form" className="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={options} />
                <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    className=""
                >
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay Now"
                        )}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
