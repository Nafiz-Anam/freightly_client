import React from "react";
import ListLayout from "./ListLayout";
import { pickupPlaces } from "../static_data";

function Step2() {
    return (
        <>
            <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
                Where do we pick up the item(s) from?
            </h2>
            <ListLayout data={pickupPlaces} />
        </>
    );
}

export default Step2;
