import React, { useContext, useEffect, useState } from "react";
import ListLayout from "./ListLayout";
import Papa from "papaparse";
import { Spinner } from "react-bootstrap";
import { DataContext } from "../context/dataContext";

function Step6() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1995630682&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { storage } = useContext(DataContext);

    const distance = parseFloat(storage.distance).toFixed(2);

    // Helper function to determine the price based on distance range
    function getPrice(distance, priceObject) {
        for (const key in priceObject) {
            const [min, max] = key.split("-").map(parseFloat);
            if (distance >= min && distance <= max) {
                return priceObject[key];
            }
        }
        return 0;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(sheetURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();

                const parsedData = Papa.parse(csvData, { header: true });
                const jsonData = parsedData.data;
                console.log("jsonData", jsonData);

                // Create a new array with the updated objects containing the "price" key
                const newArray = jsonData.map((item) => ({
                    ...item,
                    cost: getPrice(distance, item),
                }));
                console.log("newArray", newArray);

                setSheetData(newArray);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "40px",
                }}
            >
                Request Additional Assistance, Pickup or Delivery
            </h2>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ListLayout data={sheetData} step="step6" />
            )}
        </>
    );
}

export default Step6;
