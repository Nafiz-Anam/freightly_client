import React from "react";
import ListLayout from "./ListLayout";
import { pickupHelp } from "../static_data";

function Step9() {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "40px",
                }}
            >
                Request Additional Delivery Assistance, if Needed
            </h2>
            <ListLayout data={pickupHelp} />
        </>
    );
}

export default Step9;
