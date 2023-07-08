import React from "react";
import ListLayout from "./ListLayout";
import { pickupFrom } from "../static_data";

function Step2() {
    return <ListLayout data={pickupFrom} />;
}

export default Step2;
