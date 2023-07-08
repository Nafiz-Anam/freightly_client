import React from "react";
import ListLayout from "./ListLayout";
import { pickupPlaces } from "../static_data";

function Step2() {
    return <ListLayout data={pickupPlaces} />;
}

export default Step2;
