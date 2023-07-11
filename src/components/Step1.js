import React from "react";
import ListLayout from "./ListLayout";
import { pickupPlaces } from "../static_data";

function Step1() {
    return (
        <>
            <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
                Identify Your Starting Point
            </h2>
            <ListLayout data={pickupPlaces} />
        </>
    );
}

export default Step1;
