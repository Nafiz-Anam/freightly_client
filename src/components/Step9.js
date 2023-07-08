import React from "react";
import ListLayout from "./ListLayout";
import { pickupHelp } from "../static_data";

function Step8() {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "40px",
                }}
            >
                Need any extra help at the drop?
            </h2>
            <ListLayout data={pickupHelp} />
        </>
    );
}

export default Step8;
