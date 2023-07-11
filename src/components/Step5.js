import React from "react";
import ListLayout from "./ListLayout";
import { pickupFrom } from "../static_data";

function Step5() {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "40px",
                }}
            >
                Specify the Pickup Floor Level
            </h2>
            <ListLayout data={pickupFrom} />
        </>
    );
}

export default Step5;
