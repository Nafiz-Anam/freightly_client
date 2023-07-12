import React from "react";
import ListLayout from "./ListLayout";
import { pickupFrom } from "../static_data";

function Step8() {
    return (
        <>
            <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
                Indicate the Delivery Floor Level
            </h2>
            <ListLayout data={pickupFrom} step="step8" />
        </>
    );
}

export default Step8;
