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
        pickup_contact,
        delivery_contact,
    } = storage;

    const getTitlesString = (selected_items) => {
        return selected_items.map((item) => item.title).join(", ");
    };

    const getDimensionsString = (selected_items) => {
        return selected_items
            .map((item) => `${item.height} x ${item.width} x ${item.length} cm`)
            .join(", ");
    };

    const formatDimensions = ({ height, width, length }) => {
        if (height && width && length) {
            return `${width} x ${length} x ${height} cm`;
        }
        return "";
    };

    const formatAddress = (address) => {
        if (address) {
            const { delivery_address, name, email, phone } = address;
            return `${delivery_address || ""}, ${name || ""}, ${email || ""}, ${
                phone || ""
            }`;
        }
        return "";
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
    const totalPickupCost = pickupDateCost + pickupTimeCost;
    const totalDeliveryCost = pickupDateCost + deliveryTimeCost;

    return (
        <div className={style.cartSummary}>
            <h2 className={style.sumTitle}>Your delivery</h2>
            {/* items lists */}
            <div className={style.mainSummary}>
                {selected_items.length > 0 && (
                    <div className={style.ProductItem}>
                        <span className={style.itemTitle}>
                            {getTitlesString(selected_items)}
                        </span>
                        <span className={style.dimension}>
                            {getDimensionsString(selected_items)}
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
                        {(pickup_date.cost || pickup_date.cost) && (
                            <span>€{`${totalPickupCost.toFixed(2)}`}</span>
                        )}
                    </span>
                </p>
                {pickup_floor && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${pickup_floor.title}`}</span>
                        <span>{`${pickup_floor.cost}`}</span>
                    </p>
                )}
                {pickup_Assistance && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${pickup_Assistance.title}`}</span>
                        <span>{`${pickup_Assistance.cost}`}</span>
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
                        {(delivery_time.cost || pickup_date.cost) && (
                            <span>€{`${totalDeliveryCost.toFixed(2)}`}</span>
                        )}
                    </span>
                </p>
                {delivery_floor && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${delivery_floor.title}`}</span>
                        <span>{`${delivery_floor.cost}`}</span>
                    </p>
                )}
                {delivery_Assistance && (
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{`${delivery_Assistance.title}`}</span>
                        <span>{`${delivery_Assistance.cost}`}</span>
                    </p>
                )}
            </div>
            <hr className={style.hrLine} />
            <div className={style.totalPrice}>
                <h3>Total</h3>
                <h3>€0.00</h3>
            </div>
        </div>
    );
};

export default Summary;
