import React, { useContext, useEffect } from "react";
import ListLayout from "./ListLayout";
import { pickupPlaces } from "../static_data";
import { useLocation } from "react-router-dom";
import { DataContext } from "../context/dataContext";

function Step1() {
    const { storage, updateData } = useContext(DataContext);
    const location = useLocation();
    console.log("location.search", location.search);

    useEffect(() => {
        if (location.search) {
            const queryParams = new URLSearchParams(location.search);
            const {
                from: fromAddress = "",
                to: toAddress = "",
                km: distance = 0,
            } = Object.fromEntries(queryParams);

            // Check if any of the important values are present in the URL
            if (fromAddress && toAddress && distance !== 0) {
                updateData({
                    ...storage,
                    fromAddress,
                    toAddress,
                    distance: parseFloat(distance),
                });
            }

            clearURL(location.pathname);
        }
    }, [location.search]);

    const clearURL = (path) => {
        window.history.replaceState({}, document.title, path);
    };

    return (
        <>
            <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
                Identify Your Starting Point
            </h2>
            <ListLayout data={pickupPlaces} step={"step1"} />
        </>
    );
}

export default Step1;
