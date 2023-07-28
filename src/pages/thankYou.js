import React from "react";

const ThanksYou = () => {
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
