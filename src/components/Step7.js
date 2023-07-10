import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Step() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1055355179&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetURL);
                const csvData = response.data;
                // Parse the CSV data
                const parsedData = parseCSV(csvData);
                setSheetData(parsedData);
                // globalSheetData = parsedData;
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };
        fetchData();
    }, []);

    // Function to parse CSV data into an array of rows
    const parseCSV = (csvData) => {
        const rows = csvData.split("\n");
        const parsedData = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(",");
            //if i > 30, break
            if (i > 30) {
                break;
            }
            parsedData.push(row);
        }
        //sheetData is an array of items
        return parsedData;
    };

    console.log("sheetData", sheetData);

    let jsonArray = [];
    sheetData.forEach((data) => {
        // Create an object with the required properties
        let obj = {
            time: data[0],
            price: data[1],
        };
        // Push the object to the array
        jsonArray.push(obj);
    });

    console.log("jsonArray", jsonArray);

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);
    };

    return (
        <div className="list-layout">
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "15px",
                    paddingBottom: "25px",
                }}
            >
                Determine Your Desired Delivery Time
            </h2>
            <ul className="list">
                {jsonArray.map((item) => (
                    <li key={item.time}>
                        <button
                            className={`list-item2 ${
                                selectedItem === item.time ? "selected" : ""
                            }`}
                            onClick={() => handleItemClick(item.time)}
                        >
                            <span className="item-name">{item.time}</span>
                            <span className="item-name">{item.price}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Step;
