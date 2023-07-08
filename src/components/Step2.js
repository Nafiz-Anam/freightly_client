import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchComponent from "./SearchComponent";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

function Step3() {
    // const classes = useStyles();
    const [sheetData, setSheetData] = useState([]);

    // Function to parse CSV data into an array of rows
    const parseCSV = (csvData) => {
        const rows = csvData.split("\n");
        const parsedData = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(",");
            parsedData.push(row);
        }
        //sheetData is an array of items
        return parsedData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetURL);
                const csvData = response.data;
                // Parse the CSV data
                const parsedData = parseCSV(csvData);
                console.log("parsedData", parsedData);

                setSheetData(parsedData);
                // globalSheetData = parsedData;
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="step3">
            <SearchComponent items={sheetData} />
        </div>
    );
}

export default Step3;
