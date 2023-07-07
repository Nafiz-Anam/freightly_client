import React, { useState } from "react";
import { pickupPlaces } from "../static_data";
import { FaHome, FaWarehouse } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiAuctionFill } from "react-icons/ri";

const ListLayout = () => {
    const [selectedItem, setSelectedItem] = useState("");

    let icon_arr = [
        <FaHome className="icon" />,
        <AiFillShop className="icon" />,
        <HiBuildingOffice2 className="icon" />,
        <FaWarehouse className="icon" />,
        <RiAuctionFill className="icon" />,
    ];

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);
    };

    return (
        <div className="list-layout">
            <ul className="list">
                {pickupPlaces.map((item) => (
                    <li key={item.title}>
                        <button
                            className={`list-item ${
                                selectedItem === item.title ? "selected" : ""
                            }`}
                            onClick={() => handleItemClick(item.title)}
                        >
                            {icon_arr[item.icon]}
                            <span className="item-name">{item.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListLayout;
