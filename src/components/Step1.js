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
            // Parse the query parameters from the URL
            const queryParams = new URLSearchParams(location.search);
            // Extract the from address, to address, and distance from the query parameters
            const fromAddress = queryParams.get("from") || "";
            const toAddress = queryParams.get("to") || "";
            const distance = parseFloat(queryParams.get("km")) || 0;

            // Update the global storage with the extracted data
            updateData({
                ...storage,
                fromAddress: fromAddress,
                toAddress: toAddress,
                distance: distance,
            });

            // Clear the URL by removing all queries
            const cleanURL = location.pathname;
            window.history.replaceState({}, document.title, cleanURL);
        }
    }, [location.search]);

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
