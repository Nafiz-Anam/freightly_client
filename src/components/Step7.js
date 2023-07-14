import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { DataContext } from "../context/dataContext";

function Step4() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1055355179&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    console.log("selectedItem", selectedItem);
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);

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
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        updateData({
            ...storage,
            delivery_time: item,
        });
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
                {sheetData.map((item) => (
                    <li key={item.time}>
                        <button
                            className={`list-item2 ${
                                selectedItem.time === item.time
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleItemClick(item)}
                        >
                            <span className="item-name">{item.time}</span>
                            <span className="item-name">{item.cost}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Step4;
