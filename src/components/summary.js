import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/dataContext";
import style from "./summary.module.css";
import Papa from "papaparse";

const Summary = () => {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1772464100&single=true&output=csv";

    const materialSheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=981080402&single=true&output=csv";

    const { storage } = useContext(DataContext);
    const {
        fromAddress,
        toAddress,
        distance,
        selected_items,
        starting_point,
        pickup_date,
        pickup_time,
        pickup_floor,
        pickup_Assistance,
        delivery_time,
        delivery_Assistance,
        delivery_floor,
    } = storage;

    const [sheetData, setSheetData] = useState([]);
    const [materialData, setMaterialData] = useState([]);
    // console.log("sheetData", sheetData);
    const [kmRange, setKmRange] = useState({});
    console.log("kmRange", kmRange);

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

        const fetchMaterialData = async () => {
            try {
                const response = await fetch(materialSheetURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true });
                const priceJson = parsedData.data;
                setMaterialData(priceJson);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
        fetchMaterialData();
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

    // Define the defaultPrice and distancePrice states
    const [defaultPrice, setDefaultPrice] = useState(0);
    // console.log("defaultPrice", defaultPrice);
    const [distancePrice, setDistancePrice] = useState(0);
    // console.log("distancePrice", distancePrice);

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
    console.log("totalItemsPrice", totalItemsPrice);

    // Calculate the total item price
    const transportPrice = parseFloat(defaultPrice + distancePrice);

    const pickupFrom = fromAddress.split(",")[0];
    const deliveryTo = toAddress.split(",")[0];

    const getTitlesString = (selected_items) => {
        return selected_items.map((item) => item.title).join(", ");
    };

    const getDimensionsString = (selected_items) => {
        return selected_items
            .map((item) => `${item.height} x ${item.width} x ${item.length} cm`)
            .join(", ");
    };

    // Function to check if an item has "Glass" material
    const hasGlassMaterial = function (item) {
        return item.materials && item.materials.toLowerCase().includes("glass");
    };

    // Filter out the items that have "Glass" material
    const glassItems = selected_items.filter(hasGlassMaterial);
    console.log("glassItems", glassItems);

    const calculateGlassMaterialPrice = (selectedItems) => {
        console.log("selectedItems", selectedItems);
        // Filter the materialData array to get the "Glass" material
        const glassMaterial = materialData.find((material) =>
            material.price_per_material.toLowerCase().includes("glass")
        );
        console.log("glassMaterial", glassMaterial);

        if (!glassMaterial) {
            // If "Glass" material is not found, return 0
            return 0;
        }

        // Extract the price of "Glass" material
        const glassMaterialPrice = parseFloat(
            glassMaterial.cost.replace("€", "")
        );
        console.log("glassMaterialPrice", glassMaterialPrice);

        // Calculate the total material price for items with "Glass" material
        const totalGlassMaterialPrice = selectedItems.reduce((acc, item) => {
            if (hasGlassMaterial(item)) {
                // Add the price of "Glass" material multiplied by item count to the accumulator
                return acc + glassMaterialPrice * item.count;
            }
            return acc;
        }, 0);

        return totalGlassMaterialPrice;
    };
    const totalGlassMaterialPrice = calculateGlassMaterialPrice(glassItems);
    console.log("totalGlassMaterialPrice", totalGlassMaterialPrice);

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

    let pickupAssistCost = 0;
    if (Object.keys(pickup_Assistance).length) {
        // Loop through the keys of the costData object
        for (const range of Object.keys(pickup_Assistance)) {
            // Extract the numeric lower and upper bounds from the range
            const [lower, upper] = range.split("-").map(parseFloat);

            // Check if the numericDistance is within the range
            if (distance >= lower && distance <= upper) {
                pickupAssistCost = parseFloat(
                    pickup_Assistance[range].replace("€", "")
                );
                break; // Exit the loop since we found the matching range
            }
        }
        // console.log("Cost for distance", distance, "km:", pickupAssistCost);
    }

    let deliveryAssistCost = 0;
    if (Object.keys(delivery_Assistance).length) {
        // Loop through the keys of the costData object
        for (const range of Object.keys(delivery_Assistance)) {
            // Extract the numeric lower and upper bounds from the range
            const [lower, upper] = range.split("-").map(parseFloat);

            // Check if the numericDistance is within the range
            if (distance >= lower && distance <= upper) {
                deliveryAssistCost = parseFloat(
                    delivery_Assistance[range].replace("€", "")
                );
                break; // Exit the loop since we found the matching range
            }
        }
        // console.log("Cost for distance", distance, "km:", deliveryAssistCost);
    }

    // Calculate the total cost by summing up the pickup and delivery costs
    const totalCost =
        transportPrice +
        pickupFloorCost +
        pickupAssistCost +
        totalPickupCost +
        deliveryFloorCost +
        deliveryAssistCost +
        totalDeliveryCost +
        totalItemsPrice;

    return (
        <div className={style.cartSummary}>
            <h2 className={style.sumTitle}>Your delivery</h2>
            <div className={style.summaryList}>
                {/* items lists */}
                <div className={style.mainSummary}>
                    {selected_items.length > 0 && (
                        <div className={style.ProductItem}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span className={style.itemTitle}>
                                    {getTitlesString(selected_items)}
                                </span>
                                <span className={style.dimension}>
                                    {getDimensionsString(selected_items)}
                                </span>
                            </div>
                            <span className={style.cost}>
                                {/* Display the price of each item */}
                                {totalItemsPrice && (
                                    <span className={style.cost}>
                                        €
                                        {`${(
                                            totalItemsPrice -
                                            totalGlassMaterialPrice
                                        ).toFixed(2)}`}
                                    </span>
                                )}
                            </span>
                        </div>
                    )}
                </div>
                {glassItems.length > 0 && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Fragile Items included</span>
                        <span className={style.cost}>
                            €{`${totalGlassMaterialPrice.toFixed(2)}`}
                        </span>
                    </p>
                )}
                {transportPrice > 0 && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Transportation</span>
                        <span className={style.cost}>
                            €{`${transportPrice.toFixed(2)}`}
                        </span>
                    </p>
                )}
                {/* pickup details */}
                <div className={style.pickupDetails}>
                    <h2 className={style.addressLabel}>
                        Pickup from <span>{pickupFrom}</span>
                    </h2>
                    {starting_point && <p>{`${starting_point.title}`}</p>}
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>
                            {pickup_date.date && (
                                <span>{`${pickup_date.date}`}</span>
                            )}{" "}
                            {pickup_time.time && (
                                <span>{`${pickup_time.time}`}</span>
                            )}
                        </span>
                        <span>
                            {(pickup_date.cost || pickup_date.cost) &&
                                totalPickupCost > 0 && (
                                    <span className={style.cost}>
                                        €{`${totalPickupCost.toFixed(2)}`}
                                    </span>
                                )}
                        </span>
                    </p>
                    {pickup_floor.title != "Ground Floor" && (
                        <p
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{`${pickup_floor.title}`}</span>
                            <span
                                className={style.cost}
                            >{`${pickup_floor.cost}`}</span>
                        </p>
                    )}
                    {pickup_Assistance.title !== "No, not necessary" &&
                        pickup_Assistance.title !== "" && (
                            <p
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{`${pickup_Assistance.title}`}</span>
                                <span className={style.cost}>
                                    €{`${pickupAssistCost.toFixed(2)}`}
                                </span>
                            </p>
                        )}
                </div>
                {/* delivery details */}
                <div className={style.deliveryDetails}>
                    <h2 className={style.addressLabel}>
                        Delivery to <span>{deliveryTo}</span>
                    </h2>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>
                            {pickup_date.date && (
                                <span>{`${pickup_date.date}`}</span>
                            )}{" "}
                            {delivery_time.time && (
                                <span>{`${delivery_time.time}`}</span>
                            )}
                        </span>
                        <span>
                            {(delivery_time.cost || pickup_date.cost) &&
                                totalDeliveryCost > 0 && (
                                    <span className={style.cost}>
                                        €{`${totalDeliveryCost.toFixed(2)}`}
                                    </span>
                                )}
                        </span>
                    </p>
                    {delivery_floor.title != "Ground Floor" && (
                        <p
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{`${delivery_floor.title}`}</span>
                            <span
                                className={style.cost}
                            >{`${delivery_floor.cost}`}</span>
                        </p>
                    )}
                    {delivery_Assistance.title != "No, not necessary" &&
                        delivery_Assistance.title != "" && (
                            <p
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{`${delivery_Assistance.title}`}</span>
                                <span className={style.cost}>
                                    €{`${deliveryAssistCost.toFixed(2)}`}
                                </span>
                            </p>
                        )}
                </div>
            </div>
            <hr className={style.hrLine} />
            <div className={style.totalPrice}>
                <h3>Total</h3>
                <h3>€{totalCost.toFixed(2)}</h3>{" "}
                {/* Display the calculated total cost */}
            </div>
        </div>
    );
};

export default Summary;
