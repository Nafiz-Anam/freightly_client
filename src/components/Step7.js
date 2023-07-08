import React from "react";
import ListLayout from "./ListLayout";
import { pickupHelp } from "../static_data";

function Step2() {
    return <ListLayout data={pickupHelp} />;
}

export default Step2;
