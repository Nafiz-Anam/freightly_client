import React, { useContext, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../context/dataContext";

const ThankYouReq = () => {
    const { storage } = useContext(DataContext);

    useEffect(() => {
        handleOrderRequest();
    }, []);

    const handleOrderRequest = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/order/request`, {
                storage,
            })
            .then((result) => {
                console.log(result);
                handleInvoice(result.data.order_id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInvoice = async (order_id) => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/payment/mail`, {
                order_id,
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
                Thank You for the Order Request.
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

export default ThankYouReq;
