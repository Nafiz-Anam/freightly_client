import React, { useContext } from "react";
import { DataContext } from "../context/dataContext";
import style from "./summary.module.css";

const Summary = () => {
    const { storage } = useContext(DataContext);

    const {
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

    const getTitlesString = (selected_items) => {
        return selected_items.map((item) => item.title).join(", ");
    };

    const getDimensionsString = (selected_items) => {
        return selected_items
            .map((item) => `${item.height} x ${item.width} x ${item.length} cm`)
            .join(", ");
    };

    const pickupDateCost = pickup_date.cost
        ? parseFloat(pickup_date.cost.replace("€", ""))
        : 0;
    const pickupTimeCost = pickup_time.cost
        ? parseFloat(pickup_time.cost.replace("€", ""))
        : 0;
    const deliveryTimeCost = delivery_time.cost
        ? parseFloat(delivery_time.cost.replace("€", ""))
        : 0;
    const pickupFloorCost = parseFloat(
        (pickup_floor.cost ? pickup_floor.cost : "€0.0").replace("€", "")
    );
    const pickupAssistCost = parseFloat(
        (pickup_Assistance.cost ? pickup_Assistance.cost : "€0.0").replace(
            "€",
            ""
        )
    );
    const deliveryFloorCost = parseFloat(
        (delivery_floor.cost ? delivery_floor.cost : "€0.0").replace("€", "")
    );
    const deliveryAssistCost = parseFloat(
        (delivery_Assistance.cost ? delivery_Assistance.cost : "€0.0").replace(
            "€",
            ""
        )
    );

    const totalPickupCost = pickupDateCost + pickupTimeCost;
    const totalDeliveryCost = deliveryTimeCost;

    // Function to get the price of an item from storage
    const getItemPrice = (item) => {
        return item.cost || 0;
    };

    // Calculate the total price of all items
    const totalItemsPrice = selected_items.reduce((acc, item) => {
        return acc + getItemPrice(item);
    }, 0);
    console.log("totalItemsPrice", totalItemsPrice);

    // Calculate the total cost by summing up the pickup and delivery costs
    const totalCost =
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
            {/* items lists */}
            <div className={style.mainSummary}>
                {selected_items.length > 0 && (
                    <div className={style.ProductItem}>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                                    €{`${totalItemsPrice.toFixed(2)}`}
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </div>
            {/* pickup details */}
            <div className={style.pickupDetails}>
                <h2 className={style.addressLabel}>Pickup Address</h2>
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
                {pickup_Assistance.title != "No, not necessary" && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${pickup_Assistance.title}`}</span>
                        <span
                            className={style.cost}
                        >{`${pickup_Assistance.cost}`}</span>
                    </p>
                )}
            </div>
            {/* delivery details */}
            <div className={style.deliveryDetails}>
                <h2 className={style.addressLabel}>Delivery Address</h2>
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
                {delivery_Assistance.title != "No, not necessary" && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${delivery_Assistance.title}`}</span>
                        <span
                            className={style.cost}
                        >{`${delivery_Assistance.cost}`}</span>
                    </p>
                )}
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
