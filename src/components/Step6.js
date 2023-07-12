import React from "react";
import ListLayout from "./ListLayout";
import { pickupHelp } from "../static_data";

function Step6() {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "40px",
                }}
            >
                Request Additional Pickup Assistance, if Needed
            </h2>
            <ListLayout data={pickupHelp} step="step6" />
        </>
    );
}

export default Step6;
