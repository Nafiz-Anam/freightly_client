import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import moment from "moment";
import { DataContext } from "../context/dataContext";

function Step3() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=322664730&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    console.log("sheetData", sheetData);
    const [selectedItem, setSelectedItem] = useState("");
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

                const currentDate = moment();
                const futureDate = moment().add(10, "days");

                const filteredData = jsonData.filter((item) => {
                    const itemDate = moment(item.date, "DD-MMM");

                    return (
                        itemDate.isSameOrAfter(currentDate, "day") &&
                        itemDate.isSameOrBefore(futureDate, "day")
                    );
                });

                console.log("filteredData", filteredData);
                setSheetData(filteredData);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);
        updateData({
            ...storage,
            pickup_date: itemValue,
        });
    };

    return (
        <div className="list-layout">
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                }}
            >
                Select Your Preferred Collection Date
            </h2>
            <ul className="list">
                {sheetData.map((item) => (
                    <li key={item.date}>
                        <button
                            className={`list-item2 ${
                                selectedItem.date === item.date
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleItemClick(item)}
                        >
                            <span
                                style={{ textAlign: "left", width: "40%" }}
                                className="item-name"
                            >
                                {item.date}
                            </span>
                            <span
                                style={{ textAlign: "left", width: "40%" }}
                                className="item-name"
                            >
                                {item.day}
                            </span>
                            <span
                                style={{ textAlign: "right", width: "20%" }}
                                className="item-name"
                            >
                                {item.cost}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Step3;
