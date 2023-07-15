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

    const totalPrice = selected_items.reduce(
        (total, item) => total + item.cost,
        0
    );

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
                <p>
                    {pickup_date.date && <span>{`${pickup_date.date}`}</span>}{" "}
                    {pickup_time.time && <span>{`${pickup_time.time}`}</span>}
                </p>
                {pickup_floor && <p>{`${pickup_floor.title}`}</p>}
                {pickup_Assistance && <p>{`${pickup_Assistance.title}`}</p>}
            </div>
            {/* delivery details */}
            <div className={style.deliveryDetails}>
                <h2 className={style.addressLabel}>Delivery Address</h2>
                <p>
                    {pickup_date.date && <span>{`${pickup_date.date}`}</span>}{" "}
                    {delivery_time.time && (
                        <span>{`${delivery_time.time}`}</span>
                    )}
                </p>

                {delivery_floor && <p>{`${delivery_floor.title}`}</p>}
                {delivery_Assistance && <p>{`${delivery_Assistance.title}`}</p>}
            </div>
            <hr className={style.hrLine} />
            <div className={style.totalPrice}>
                <h3>Total</h3>
                <h3>{totalPrice}</h3>
            </div>
        </div>
    );
};

export default Summary;
