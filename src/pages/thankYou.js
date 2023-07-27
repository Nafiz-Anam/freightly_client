import React from "react";

const ThanksYou = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div>Thanks You for the Order You will be contacted shorty.</div>
            <a href="https://freightly.nl/">
                <button>Go to Website</button>
            </a>
        </div>
    );
};

export default ThanksYou;
