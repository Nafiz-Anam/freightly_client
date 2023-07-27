import React, { useEffect, useState } from "react";
import ListLayout from "./ListLayout";
import Papa from "papaparse";
import { Spinner } from "react-bootstrap";

function Step9_no() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1995630682&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                setSheetData(jsonData);
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
                Request Additional Delivery Assistance, if Needed
            </h2>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ListLayout data={sheetData} step="step9" />
            )}
        </>
    );
}

export default Step9_no;
