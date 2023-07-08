import React from "react";
import ListLayout from "./ListLayout";
import { pickupFrom } from "../static_data";

function Step2() {
    return (
        <>
            <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
                Need any extra lifting help at the drop?
            </h2>
            <ListLayout data={pickupFrom} />
        </>
    );
}

export default Step2;
