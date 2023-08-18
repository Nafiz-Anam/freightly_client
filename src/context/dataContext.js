import React, { createContext, useEffect, useState } from "react";
import { initialStorage } from "./data";
import useLocalStorageState from "../hooks/useLocalStorageState";
import Papa from "papaparse";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1772464100&single=true&output=csv";

// const materialSheetURL =
//     "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=981080402&single=true&output=csv";

// Create a new context
export const DataContext = createContext();

// Create a data provider component
export const DataProvider = ({ children }) => {
    // Retrieve the stored state from localStorage if available
    const [storage, setStorage] = useLocalStorageState(
        "storage",
        initialStorage
    );
    console.log("global state => ", storage);

    // Function to update data
    const updateData = (newData) => {
        console.log("newData => ", newData);
        setStorage((prevStorage) => {
            const updatedStorage = { ...prevStorage, ...newData };
            return updatedStorage;
        });
        // const updatedStorage = { ...storage, ...newData };
        // setStorage(updatedStorage);
    };

    // ======================================== //
    const {
        distance,
        selected_items,
        pickup_date,
        pickup_time,
        pickup_floor,
        request_assistance,
        delivery_time,
        delivery_floor,
    } = storage;

    const [sheetData, setSheetData] = useState([]);
    // console.log("sheetData", sheetData);
    const [kmRange, setKmRange] = useState({});
    // console.log("kmRange", kmRange);
    // Define the defaultPrice and distancePrice states
    const [defaultPrice, setDefaultPrice] = useState(0);
    // console.log("defaultPrice", defaultPrice);
    const [distancePrice, setDistancePrice] = useState(0);
    // console.log("distancePrice", distancePrice);
    const [totalCost, setTotalCost] = useState(0);

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

                setSheetData(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (sheetData.length > 0) {
            for (const kmObj of sheetData) {
                const [minValue, maxValue] = kmObj.distance_km.split("-");
                if (minValue <= distance && distance <= maxValue) {
                    setKmRange(kmObj);
                    break;
                }
            }
        }
    }, [sheetData]);

    useEffect(() => {
        // Parse the default_price value and set it to defaultPrice state
        if (kmRange.default_price) {
            setDefaultPrice(parseFloat(kmRange.default_price));
        } else {
            setDefaultPrice(0);
        }
        // Parse the price value and calculate distancePrice based on the distance
        if (kmRange.price) {
            const priceWithoutEuro = parseFloat(kmRange.price.replace("€", ""));
            setDistancePrice(priceWithoutEuro * distance);
        } else {
            setDistancePrice(0);
        }
    }, [kmRange, distance]);

    // Function to get the price of an item from storage
    const getItemPrice = (item) => {
        return item.cost || 0;
    };
    // Calculate the total price of all items
    const totalItemsPrice = selected_items.reduce((acc, item) => {
        return acc + getItemPrice(item);
    }, 0);
    // console.log("totalItemsPrice", totalItemsPrice);

    // Calculate the total item price
    const transportPrice = parseFloat(defaultPrice + distancePrice);

    const pickupDateCost = pickup_date.cost
        ? parseFloat(pickup_date.cost.replace("€", ""))
        : 0;
    const pickupTimeCost = pickup_time.cost
        ? parseFloat(pickup_time.cost.replace("€", ""))
        : 0;
    const deliveryTimeCost = delivery_time.cost
        ? parseFloat(delivery_time.cost.replace("€", ""))
        : 0;
    let pickupFloorCost = 0;
    pickupFloorCost = parseFloat(
        (pickup_floor.cost ? pickup_floor.cost : "€0.0").replace("€", "")
    );
    let deliveryFloorCost = 0;
    deliveryFloorCost = parseFloat(
        (delivery_floor.cost ? delivery_floor.cost : "€0.0").replace("€", "")
    );

    const totalPickupCost = pickupDateCost + pickupTimeCost;
    const totalDeliveryCost = deliveryTimeCost;

    let pickupAssistCost = request_assistance.cost
        ? parseFloat(request_assistance.cost.slice(1))
        : 0;
    // console.log(request_assistance);

    // Calculate the total cost by summing up the pickup and delivery costs
    useEffect(() => {
        setTotalCost(
            transportPrice +
                pickupFloorCost +
                pickupAssistCost +
                totalPickupCost +
                deliveryFloorCost +
                totalDeliveryCost +
                totalItemsPrice
        );
    }, [
        transportPrice,
        pickupFloorCost,
        pickupAssistCost,
        totalPickupCost,
        deliveryFloorCost,
        totalDeliveryCost,
        totalItemsPrice,
    ]);

    useEffect(() => {
        if (storage.distance) {
            updateData({
                // ...storage,
                total_price: parseFloat(totalCost.toFixed(2)),
            });
        }
    }, [totalCost]);

    useEffect(() => {
        if (storage.distance) {
            updateData({
                // ...storage,
                transportPrice: parseFloat(transportPrice.toFixed(2)),
            });
        }
    }, [transportPrice]);
    // ======================================== //

    // Pass the data provider value to the children components
    return (
        <DataContext.Provider value={{ storage, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
